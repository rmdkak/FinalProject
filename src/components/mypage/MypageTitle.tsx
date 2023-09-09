import { Link } from "react-router-dom";

interface Props {
  title: string;
  isBorder: boolean;
}

export const MypageTitle = ({ title, isBorder }: Props) => {
  return (
    <div className={`w-full pb-6 text-center ${isBorder ? "border-b-2 border-black" : ""}`}>
      <Link to="/mypage" className="text-[32px] font-normal leading-[130%]">
        {title}
      </Link>
    </div>
  );
};
