import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import mainPreview from "assets/mainpreviewImg.jpg";
import calcArrow from "assets/svgs/calcArrow.svg";
import thumnail1 from "assets/thumbnail1.png";
import thumnail2 from "assets/thumbnail2.png";
import { HomeContentsTitle, HomeKvBanner } from "components/home";
import { usePostsQuery, useFlicking, useMovePage } from "hooks";

export const Home = () => {
  const { setCurrentPathname } = useMovePage();
  setCurrentPathname();
  const navigate = useNavigate();
  const { fetchPostsMutation } = usePostsQuery();
  const { data: postList } = fetchPostsMutation;
  const { bestPostList, isExistCombination } = useFlicking();

  const filterdPostList = postList?.sort((a, b) => b.bookmark - a.bookmark).filter((_, idx) => idx < 3);
  const rankingList = postList
    ?.sort((a, b) => b.bookmark - a.bookmark)
    .filter((post, idx) => isExistCombination(post, "all") && idx < 10);

  return (
    <div className="items-center flex-column gap-[120px] mt-16">
      <div className="flex w-full">
        <div className="flex-column w-[30%] min-w-[561px] mx-[5%] mb-20 mt-[100px]">
          <div className="mx-auto my-auto">
            <h1 className="text-[56px] leading-[130%]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="mt-4 mb-10 text-xl text-gray01 leading-[30px]">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
            <label htmlFor="toInteriorPreview" className="mr-3 text-[12px] text-gray02 hover:cursor-pointer">
              VIEW MORE
            </label>
            <button
              id="toInteriorPreview"
              onClick={() => {
                navigate("/interior-preview");
              }}
            >
              <img src={calcArrow} className="view-more-icon" />
            </button>
          </div>
        </div>
        <div className="flex w-[70%] gap-[5%]">
          <HomeKvBanner />
        </div>
      </div>
      <div className="home-section">
        <HomeContentsTitle title={"지금 뜨고있는 베스트조합"} navigation={false} />
        <img src={mainPreview} alt="preview" className="w-full h-[740px]" />
        <div className="flex gap-10">
          {rankingList?.map((post, idx) => (
            <div className="items-center gap-4 flex-column w-[125px]" key={post.id}>
              <p className="w-6 h-6 text-center">{idx + 1}</p>
              {isExistCombination(post, "interior") && (
                <div className="relative inline-flex">
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.leftWallpaperId as string}`}
                    alt="좌측 벽지"
                    className="absolute top-0 right-[13px] min-w-[48px] min-h-[48px] rounded-full border border-gray05"
                  ></img>
                  <img
                    src={`${STORAGE_URL}/wallpaper/${post.rightWallpaperId as string}`}
                    alt="우측 벽지"
                    className="absolute top-0 left-[-22.5px] min-w-[48px] min-h-[48px] rounded-full border border-gray05"
                  ></img>
                  <img
                    src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                    alt="바닥"
                    className="absolute min-w-[48px] min-h-[48px] top-0 left-[15px] rounded-full border border-gray05"
                  ></img>
                </div>
              )}
              {isExistCombination(post, "paint") && post.leftColorCode !== null && post.rightColorCode !== null && (
                <div className="relative inline-flex">
                  <div
                    style={{
                      backgroundColor: post.leftColorCode,
                    }}
                    className="absolute top-0 right-[13px] min-w-[48px] min-h-[48px] rounded-full border border-gray05"
                  ></div>
                  <div
                    style={{
                      backgroundColor: post.rightColorCode,
                    }}
                    className="absolute top-0 left-[-30.5px] min-w-[48px] min-h-[48px] rounded-full border border-gray05"
                  ></div>
                  <img
                    src={`${STORAGE_URL}/tile/${post.tileId as string}`}
                    alt="바닥"
                    className="absolute top-0 left-[15px] min-w-[48px] min-h-[48px] rounded-full border border-gray05"
                  ></img>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="home-section">
        <HomeContentsTitle title={"EVENT"} page={"event"} navigation={true} />
        <div className="flex gap-10">
          <div className="w-full gap-6 flex-column">
            <img src={thumnail1} alt="thumnail" className="h-[400px] rounded-xl object-contain"></img>
            <div className="gap-2 flex-column">
              <h2 className="text-2xl font-medium">홈 & 리빙 페스티벌</h2>
              <p className="text-gray02">가을 분위기로 변신할 수 있는 기회! 홈&리빙 페스티벌을 즐겨보세요</p>
            </div>
          </div>
          <div className="w-full gap-6 flex-column">
            <img src={thumnail2} alt="thumnail" className="h-[400px] rounded-xl object-contain"></img>
            <div className="gap-2 flex-column">
              <h2 className="text-2xl font-medium">요즘 뜨는 신상 아이템</h2>
              <p className="text-gray02">최신 유행하는 신상 아이템을 바로 확인해보세요!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20 home-section">
        <HomeContentsTitle title={"COMMUNITY"} page={"community"} navigation={true} />
        <div className="flex w-full gap-10">{filterdPostList?.map((post) => bestPostList(post))}</div>
      </div>
    </div>
  );
};
