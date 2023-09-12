import { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import type { IconType } from "react-icons/lib";
import { RxBookmark, RxPencil2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";

import defaultImg from "assets/defaultImg.jpg";
import { Title, MypageSkeleton, PreviewBox, MyActiveCountBox } from "components";
import { useAuthQuery } from "hooks/useAuthQuery";
import { useMypageQuery } from "hooks/useMypageQuery";
import { useAuthStore } from "store";

export interface MypageInfo {
  title: string;
  link: string;
  icon: IconType;
  data?: any[] | undefined;
}

export const MYPAGE_LAYOUT_STYLE: string =
  "flex-column items-center m-[60px] max-w-[1280px] w-[90%] mx-auto sm:mt-6 sm:mb-20";

export const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentSession } = useAuthStore();
  const { currentUserResponse } = useAuthQuery();
  const { data: currentUser, isLoading, isError } = currentUserResponse;

  const {
    userPostsResponse: { data: postData },
    userCommentsResponse: { data: commentData },
    userBookmarksResponse: { data: bookmarkData },
    userLikesResponse: { data: likeData },
    userInquiryResponse: { data: inquiryData },
  } = useMypageQuery();

  const countBoxArray: MypageInfo[] = [
    { title: "내가 쓴 글", link: "/mypage/post", icon: RxPencil2, data: postData },
    { title: "내가 쓴 댓글", link: "/mypage/comment", icon: BiCommentDetail, data: commentData },
    { title: "북마크", link: "/mypage/bookmark", icon: RxBookmark, data: bookmarkData },
    { title: "좋아요", link: "/mypage/like", icon: AiOutlineHeart, data: likeData },
    { title: "문의&신고", link: "/mypage/inquiry", icon: HiOutlineChatBubbleLeftRight, data: inquiryData },
  ];

  useEffect(() => {
    if (currentSession === null && location.pathname === "/mypage") {
      navigate("/");
    }
  }, []);

  if (currentUser === undefined || isLoading) return <MypageSkeleton />;

  if (isError) return <MypageSkeleton />;

  if (currentSession === null) {
    navigate("/");
    return <></>;
  }

  const imgStyle = { alt: "프로필 이미지", className: "w-[60px] h-[60px] rounded-full text-center justify-center" };

  const { name, avatar_url: profileImg } = currentUser;
  return (
    <div className={`${MYPAGE_LAYOUT_STYLE}`}>
      <Title title={"마이페이지"} isBorder={true} />
      <div className="flex w-full gap-[2.5%] mt-8 contents-center sm:flex-col sm:gap-6">
        <div className="relative flex-column contents-center gap-4 w-[17.5%] sm:w-[88%] h-[200px] px-6 bg-gray08 rounded-xl border border-gray05">
          {profileImg === "" ? <img src={defaultImg} {...imgStyle} /> : <img src={profileImg} {...imgStyle} />}
          <div className="gap-2 flex-column contents-center">
            <p className="text-black body-1">{`${name}님`}</p>
            {currentSession?.user.app_metadata.provider === "email" && (
              <Link to="/mypage/update" className="px-2 py-1 border rounded-lg border-gray05 body-4">
                회원정보수정
              </Link>
            )}
          </div>
        </div>
        <MyActiveCountBox mypageInfoArray={countBoxArray} adminCheck={currentSession.user.id} />
      </div>
      <PreviewBox mypageInfoArray={countBoxArray} userId={currentSession.user.id} />
    </div>
  );
};
