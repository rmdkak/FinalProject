import { FlickingForm, HomeContentsTitle, HomeKvBanner } from "components/home";
import { usePosts } from "hooks";

export const Home = () => {
  const { fetchPostsMutation } = usePosts();
  const { data: postList } = fetchPostsMutation;

  const filterdPostList = postList?.sort((a, b) => b.bookmark - a.bookmark).filter((_, idx) => idx < 3);

  const testArr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="items-center flex-column gap-[120px] mt-20">
      <div className="flex w-full">
        <div className="flex-column w-[30%] min-w-[560px] mx-[5%] mb-20 mt-[100px]">
          <div className="mx-auto my-auto">
            <h1 className="text-[56px]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="text-xl text-gray01">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
          </div>
        </div>
        <div className="flex w-[70%] gap-[5%]">
          <HomeKvBanner />
        </div>
      </div>
      <div className="home-section">
        <HomeContentsTitle title={"지금 뜨고있는 베스트조합"} page={"service"} />
        <div className="w-full h-[740px] bg-gray-400"></div>
        <div className="flex gap-10">
          {testArr.map((_, idx) => (
            <div className="items-center gap-4 flex-column w-[125px]" key={idx}>
              <p className="w-6 h-6 text-center rounded-full bg-point">{idx + 1}</p>
              <div className="relative inline-flex">
                <div className="absolute top-0 right-[13px] w-12 h-12 rounded-full bg-gray01"></div>
                <div className="absolute top-0 left-[-30.5px] w-12 h-12 rounded-full bg-gray02"></div>
                <div className="absolute top-0 left-[15px]-0 w-12 h-12 rounded-full bg-gray03"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-section">
        <HomeContentsTitle title={"EVENT"} page={"event"} />
        <div className="flex gap-10">
          <div className="w-full gap-6 flex-column">
            <div className="h-[400px] bg-gray-200 rounded-xl"></div>
            <div className="gap-2 flex-column">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
          <div className="w-full gap-6 flex-column">
            <div className="h-[400px] bg-gray-200 rounded-xl"></div>
            <div className="gap-2 flex-column">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20 home-section">
        <HomeContentsTitle title={"COMMUNITY"} page={"community"} />
        <div className="flex w-full gap-10">
          {filterdPostList?.map((post) => (
            <FlickingForm key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
