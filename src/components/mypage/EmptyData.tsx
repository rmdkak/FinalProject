import { Link } from "react-router-dom";

import type { DataType } from "./mypage.type";

interface Props {
  type: Omit<DataType, "post">;
}

export const EmptyData = ({ type }: Props) => {
  const infoText = (type: Omit<DataType, "post">) => {
    switch (type) {
      case "myPost":
        return "현재 작성된 게시물이 없습니다.";
      case "myComment":
        return "현재 작성된 댓글이 없습니다.";
      case "myBookmark":
        return "현재 추가된 북마크가 없습니다.";
      case "myLike":
        return "현재 좋아요한 게시물이 없습니다.";
      case "myInquiry":
        return "작성하신 문의 글이 없습니다.";
    }
  };

  const linkSwitch = (type: Omit<DataType, "post">) => {
    switch (type) {
      case "myPost":
        return "/post";
      case "myComment":
        return "/community";
      case "myBookmark":
        return "/interior-preview";
      case "myLike":
        return "/community";
      default:
        return "/inquire";
    }
  };

  const buttonText = (type: Omit<DataType, "post">) => {
    switch (type) {
      case "myPost":
        return "글 작성하기";
      case "myComment":
        return "게시물 보러가기";
      case "myBookmark":
        return "추가하기";
      case "myLike":
        return "추가하기";
      case "myInquiry":
        return "문의하기";
    }
  };

  return (
    <>
      <p className="title-4 my-[30px]">{infoText(type)}</p>
      <div className="flex gap-6 sm:flex-col sm:w-full">
        <Link to={linkSwitch(type)} className="flex contents-center w-[130px] h-12 rounded-full bg-point sm:w-full">
          {buttonText(type)}
        </Link>
        <Link to="/mypage" className="flex contents-center w-[130px] h-12 rounded-full bg-gray07 border sm:w-full">
          마이페이지
        </Link>
      </div>
    </>
  );
};
