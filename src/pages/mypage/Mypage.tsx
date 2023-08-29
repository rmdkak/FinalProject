import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmark, RxPencil2 } from "react-icons/rx";
import { Link } from "react-router-dom";

import viewMore from "assets/viewMore.svg";
import { useAuth, useMypage } from "hooks";
import { useAuthStore } from "store";
import { type Tables } from "types/supabase";

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";

interface MyData {
  postData: Array<Tables<"POSTS", "Row">>;
  commentData: Array<Tables<"COMMENTS", "Row">>;
  bookmarkData: Array<Tables<"ITEM-BOOKMARK", "Row">>;
  likeData: Array<Tables<"POST-BOOKMARKS", "Row">>;
}

export const Mypage = () => {
  const { previewProfileUrl } = useAuthStore();
  const { currentUserResponse } = useAuth();
  const { data: currentUser, isLoading, isError } = currentUserResponse;

  const [myData, setMyData] = useState<MyData>({ postData: [], commentData: [], bookmarkData: [], likeData: [] });

  const {
    userPostsResponse: { data: postData },
    userCommentsResponse: { data: commentData },
    userBookmarksResponse: { data: bookmarkData },
    userLikesResponse: { data: likeData },
  } = useMypage();

  useEffect(() => {
    if (postData != null && commentData != null && bookmarkData != null && likeData != null) {
      setMyData({ postData, commentData, bookmarkData, likeData });
    }
  }, [postData, commentData, bookmarkData, likeData]);

  const countBoxArray = [
    {
      title: "내가 쓴 글",
      link: "/mypage/post",
      icon: <RxPencil2 className="w-[24px] h-[24px]" />,
      data: myData.postData,
      detailData: [myData.postData[0], myData.postData[1]],
    },
    {
      title: "내가 쓴 댓글",
      link: "/mypage/comment",
      icon: <BiCommentDetail className="w-[24px] h-[24px]" />,
      data: myData.commentData,
      detailData: [myData.commentData[0], myData.commentData[1]],
    },
    {
      title: "북마크",
      link: "/mypage/bookmark",
      icon: <RxBookmark className="w-[24px] h-[24px]" />,
      data: myData.bookmarkData,
      detailData: [myData.bookmarkData[0], myData.bookmarkData[1]],
    },
    {
      title: "좋아요",
      link: "/mypage/like",
      icon: <AiOutlineHeart className="w-[24px] h-[24px]" />,
      data: myData.likeData,
      detailData: [myData.likeData[0], myData.likeData[1]],
    },
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
        <p className="text-[24px] font-medium leading-[145%]">{el.data.length}</p>
      </div>
    );
  });

  // 각 카테고리 title
  const previewBox = countBoxArray.map((el) => {
    return (
      <>
        <div className="flex items-center justify-between border-b pb-[24px] mt-[80px]">
          <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
          <Link
            to={el.link}
            className="flex justify-center items-center gap-[12px] text-[12px] text-gray02 font-normal leading-[130%] "
          >
            VIEW MORE
            <img src={viewMore} className="w-[24px] h-[24px]" />
          </Link>
        </div>
      </>
    );
  });

  if (currentUser === undefined || isLoading) return <p>로딩중</p>;

  if (isError) return <p>에러페이지</p>;

  const { name, avatar_url: profileImg } = currentUser;
  return (
    <div className="flex-column items-center m-[60px] w-[1280px] mx-auto">
      {/* title */}
      <div className="w-full border-b border-b-black text-center pb-[24px]">
        <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
      </div>
      {/* 프로필 박스 */}
      <div className="flex gap-[24px] mt-[40px]">
        <div className="relative flex-column contents-center gap-[40px] w-[240px] h-[320px] px-[24px] bg-gray08 rounded-[12px] border-[1px] border-gray05">
          {previewProfileUrl === "" ? (
            <img
              src={profileImg}
              alt="프로필"
              className="w-[120px] h-[120px] rounded-full text-center justify-center"
            />
          ) : (
            <>
              <img
                src={previewProfileUrl}
                alt="미리보기"
                className="w-[120px] h-[120px] rounded-full text-center justify-center"
              />
              <span className="absolute right-[-150px] bottom-0 p-2 text-sm bg-gray-300 rounded-md cursor-default">
                미리보기
              </span>
            </>
          )}
          <div className="flex-column contents-center gap-[12px]">
            <p className="text-black dark:text-white text-[24px] font-normal leading-[145%]">{`${name}님`}</p>
            <Link
              to="/mypage/update"
              className="border-[1px] px-[24px] border-gray05 rounded-[8px] text-[12px] font-normal leading-[150%]"
            >
              회원정보수정
            </Link>
          </div>
        </div>
        {/* 카운트 박스 */}
        <div className="flex items-start border-[1px] border-gray05 rounded-[12px]">{countBox}</div>
      </div>
      {/* 카테고리 */}
      <div className="flex-column w-[1280px]">{previewBox}</div>
    </div>
  );
};
