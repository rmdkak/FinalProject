import { type DataType } from "./mypage.type";

interface Props {
  type: DataType;
}

export const MypageSubTitle = ({ type }: Props) => {
  const titleText = (type: DataType) => {
    switch (type) {
      case "post":
        return "글 작성하기";
      case "comment":
        return "내가 쓴 댓글";
      case "bookmark":
        return "북마크";
      case "like":
        return "좋아요 누른 글";
      case "inquiry":
        return "내가 작성한 문의 & 신고 답변";
    }
  };
  return (
    <div className="w-full max-w-[1280px] min-w-[312px] pb-3 border-b border-b-black body-1 font-medium mt-6 hidden sm:flex">
      <p>{titleText(type)}</p>
    </div>
  );
};
