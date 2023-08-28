import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmark, RxPencil2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import viewMore from "assets/viewMore.svg";
import { useAuth } from "hooks";
import { useAuthStore } from "store";

const BR_STYLE = "absolute w-[1px] h-[40px] bg-[#E5E5E5] left-[-1px] top-1/2 translate-y-[-50%]";

export const Mypage = () => {
  const navigate = useNavigate();

  const { previewProfileUrl } = useAuthStore();
  const { currentUserResponse } = useAuth();
  const { data: currentUser } = currentUserResponse;

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }

  const countBoxArray = [
    { title: "내가 쓴 글", icon: <RxPencil2 className="w-[24px] h-[24px]" />, data: [], detailData: [] },
    { title: "내가 쓴 댓글", icon: <BiCommentDetail className="w-[24px] h-[24px]" />, data: [], detailData: [] },
    { title: "북마크", icon: <RxBookmark className="w-[24px] h-[24px]" />, data: [], detailData: [] },
    { title: "좋아요", icon: <AiOutlineHeart className="w-[24px] h-[24px]" />, data: [], detailData: [] },
  ];

  const countBox = countBoxArray.map((el) => {
    return (
      <div key={el.title} className="relative flex flex-col items-center justify-center h-full w-[254px] gap-[24px]">
        <div className="flex flex-col items-center justify-center gap-[12px]">
          {el.icon}
          <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
        </div>
        <div className={BR_STYLE}></div>
        <p className="text-[24px] font-medium leading-[145%]">{el.data.length}</p>
      </div>
    );
  });

  const previewBox = countBoxArray.map((el) => {
    return (
      <>
        <div className="flex items-center justify-between border-b pb-[24px] mt-[80px]">
          <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
          <button className="flex justify-center items-center gap-[12px] text-[12px] text-[#888888] font-normal leading-[130%] ">
            VIEW MORE<img src={viewMore} className="w-[24px] h-[24px]"></img>
          </button>
          {el.detailData}
        </div>
      </>
    );
  });

  const { name, avatar_url: profileImg } = currentUser;
  return (
    <div className="flex flex-col items-center m-[60px] w-[1280px] mx-auto">
      {/* title */}
      <div className="w-full border-b border-b-black text-center pb-[24px]">
        <h3 className="text-[32px] font-[400] leading-[130%]">마이페이지</h3>
      </div>
      {/* 프로필 박스 */}
      <div className="flex gap-[24px] mt-[40px]">
        <div className="relative flex flex-col items-center justify-center gap-[40px] w-[240px] h-[320px] px-[24px] bg-[#F9F9F9] rounded-[12px] border-[1px] border-[#D5D5D5]">
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
          <div className="flex flex-col items-center justify-center gap-[12px]">
            <p className="text-black dark:text-white text-[24px] font-normal leading-[145%]">{`${name}님`}</p>
            <button className="border-[1px] px-[24px] border-[#D5D5D5] rounded-[8px] text-[12px] font-normal leading-[150%]">
              회원정보수정
            </button>
          </div>
        </div>
        {/* 카운트 박스 */}
        <div className="flex items-start border-[1px] border-[#D5D5D5] rounded-[12px]">{countBox}</div>
      </div>
      {/* 카테고리 */}
      <div className="flex flex-col w-[1280px]">{previewBox}</div>
      {/* <MenuTab /> */}
    </div>
  );
};
