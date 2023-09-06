import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmark, RxPencil2 } from "react-icons/rx";
import { Link } from "react-router-dom";

import viewMore from "assets/svgs/viewMore.svg";
import { PreviewBookmark, PreviewComment, PreviewLike, PreviewPost, MypageTitle } from "components";
import { useAuth, useMypage } from "hooks";
import { useAuthStore } from "store";

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";

export const Mypage = () => {
  const { currentSession } = useAuthStore();
  const { currentUserResponse } = useAuth();
  const { data: currentUser, isLoading, isError } = currentUserResponse;

  const {
    userPostsResponse: { data: postData },
    userCommentsResponse: { data: commentData },
    userBookmarksResponse: { data: bookmarkData },
    userLikesResponse: { data: likeData },
  } = useMypage();

  const filteredPosts = postData?.filter((_, index) => index < 2);
  const filteredComment = commentData?.filter((_, index) => index < 2);
  const filteredBookmark = bookmarkData?.filter((_, index) => index < 5);
  const filteredLikes = likeData?.filter((_, index) => index < 2);

  const countBoxArray = [
    { title: "내가 쓴 글", link: "/mypage/post", icon: <RxPencil2 className="w-[24px] h-[24px]" />, data: postData },
    {
      title: "내가 쓴 댓글",
      link: "/mypage/comment",
      icon: <BiCommentDetail className="w-[24px] h-[24px]" />,
      data: commentData,
    },
    {
      title: "북마크",
      link: "/mypage/bookmark",
      icon: <RxBookmark className="w-[24px] h-[24px]" />,
      data: bookmarkData,
    },
    { title: "좋아요", link: "/mypage/like", icon: <AiOutlineHeart className="w-[24px] h-[24px]" />, data: likeData },
  ];

  // 내 활동의 갯수 알려주는 UI
  const countBox = countBoxArray.map((el) => {
    return (
      <div key={el.title} className="relative flex-column contents-center h-full w-[254px] gap-[24px]">
        <div className="flex-column contents-center gap-[12px]">
          {el.icon}
          <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
        </div>
        <div className={BR_STYLE}></div>
        <p className="text-[24px] font-medium leading-[145%]">{el.data === undefined ? 0 : el.data.length}</p>
      </div>
    );
  });

  // 각 카테고리 title
  const previewBox = countBoxArray.map((el) => {
    return (
      <div key={el.title} className="flex-column">
        <div className="flex items-center justify-between border-b border-black pb-[24px] mt-[80px]">
          <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
          <Link to={el.link} className="flex contents-center gap-[12px] body-4 text-gray02">
            VIEW MORE
            <img src={viewMore} className="w-[24px] h-[24px]" />
          </Link>
        </div>
        {el.title === "내가 쓴 글" && <PreviewPost postData={filteredPosts} />}
        {el.title === "내가 쓴 댓글" && <PreviewComment commentData={filteredComment} />}
        {el.title === "북마크" && <PreviewBookmark bookmarkData={filteredBookmark} />}
        {el.title === "좋아요" && <PreviewLike likeData={filteredLikes} />}
      </div>
    );
  });

  if (currentUser === undefined || isLoading) return <p>로딩중</p>;

  if (isError) return <p>에러페이지</p>;

  const { name, avatar_url: profileImg } = currentUser;
  return (
    <div className="flex-column items-center m-[60px] w-[1280px] mx-auto">
      <MypageTitle />
      {/* 프로필 박스 */}
      <div className="flex gap-[24px] mt-[40px]">
        <div className="relative flex-column contents-center gap-[40px] w-[240px] h-[320px] px-[24px] bg-gray08 rounded-[12px] border border-gray05">
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="w-[120px] h-[120px] rounded-full text-center justify-center"
            />
          )}
          <div className="flex-column contents-center gap-[12px]">
            <p className="text-black text-[24px] font-normal leading-[145%]">{`${name}님`}</p>
            {currentSession?.user.app_metadata.provider === "email" && (
              <Link
                to="/mypage/update"
                className="border px-[24px] border-gray05 rounded-[8px] text-[12px] font-normal leading-[150%]"
              >
                회원정보수정
              </Link>
            )}
          </div>
        </div>
        {/* 카운트 박스 */}
        <div className="flex items-start border border-gray05 rounded-[12px]">{countBox}</div>
      </div>
      {/* 카테고리 */}
      <div className="flex-column w-[1280px]">{previewBox}</div>
    </div>
  );
};
