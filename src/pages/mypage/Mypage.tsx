import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmark, RxPencil2 } from "react-icons/rx";
import { Link } from "react-router-dom";

import defaultImg from "assets/defaultImg.jpg";
import { MypageTitle, MypageSkeleton, PreviewBox, MyActiveCountBox } from "components";
import { useAuthQuery, useMypageQuery } from "hooks";
import { useAuthStore } from "store";

export const Mypage = () => {
  const { currentSession } = useAuthStore();
  const { currentUserResponse } = useAuthQuery();
  const { data: currentUser, isError } = currentUserResponse;

  const {
    userPostsResponse: { data: postData },
    userCommentsResponse: { data: commentData },
    userBookmarksResponse: { data: bookmarkData },
    userLikesResponse: { data: likeData },
  } = useMypageQuery();

  const filteredData = {
    filteredPosts: postData?.filter((_, index) => index < 2),
    filteredComment: commentData?.filter((_, index) => index < 2),
    filteredBookmark: bookmarkData?.filter((_, index) => index < 5),
    filteredLikes: likeData?.filter((_, index) => index < 2),
  };

  const countBoxArray = [
    { title: "내가 쓴 글", link: "/mypage/post", icon: <RxPencil2 className="w-6 h-6" />, data: postData },
    {
      title: "내가 쓴 댓글",
      link: "/mypage/comment",
      icon: <BiCommentDetail className="w-6 h-6" />,
      data: commentData,
    },
    {
      title: "북마크",
      link: "/mypage/bookmark",
      icon: <RxBookmark className="w-6 h-6" />,
      data: bookmarkData,
    },
    { title: "좋아요", link: "/mypage/like", icon: <AiOutlineHeart className="w-6 h-6" />, data: likeData },
  ];

  const isLoading = true;
  if (currentUser === undefined || isLoading) return <MypageSkeleton />;

  if (isError) return <p>에러페이지</p>;

  const { name, avatar_url: profileImg } = currentUser;
  return (
    <div className="flex-column items-center m-[60px] w-[1280px] mx-auto">
      <MypageTitle />
      {/* 프로필 박스 */}
      <div className="flex gap-6 mt-8">
        <div className="relative flex-column contents-center gap-4 w-[240px] h-[200px] px-6 bg-gray08 rounded-[12px] border border-gray05">
          {profileImg === "" ? (
            <img
              src={defaultImg}
              alt="프로필 이미지"
              className="w-[60px] h-[60px] rounded-full text-center justify-center"
            />
          ) : (
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="w-[60px] h-[60px] rounded-full text-center justify-center"
            />
          )}
          <div className="flex-column contents-center gap-2">
            <p className="text-black text-[18px] font-normal leading-[145%]">{`${name}님`}</p>
            {currentSession?.user.app_metadata.provider === "email" && (
              <Link
                to="/mypage/update"
                className="border px-2 py-1 border-gray05 rounded-lg text-[12px] font-normal leading-[150%]"
              >
                회원정보수정
              </Link>
            )}
          </div>
        </div>
        <MyActiveCountBox mypageInfoArray={countBoxArray} />
      </div>
      <PreviewBox mypageInfoArray={countBoxArray} filteredData={filteredData} />
    </div>
  );
};
