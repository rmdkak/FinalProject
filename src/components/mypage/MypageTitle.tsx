import { Link } from "react-router-dom";

export const MypageTitle = () => {
  return (
    <div className="w-full pb-6 text-center">
      <Link to="/mypage" className="text-[32px] font-normal leading-[130%]">
        마이페이지
      </Link>
    </div>
  );
};
