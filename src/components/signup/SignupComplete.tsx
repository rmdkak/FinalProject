import { Link } from "react-router-dom";

import { BUTTON_COMMON_STYLE } from "pages";
import { useAuthStore } from "store";

export const SignupComplete = () => {
  const { currentSession } = useAuthStore();
  const name = currentSession?.user.user_metadata.name as string;

  return (
    <div className="items-center flex-column">
      <p className="text-[32px] font-bold leading-[130%] mt-[80px]">회원가입 완료</p>
      <p className="text-[20px] font-normal leading-[130%] mt-[40px]">{`${name}님 환영합니다.`}</p>
      <p className="text-[14px] font-light leading-[130%] mt-[12px]">
        더 많은 인테리어 정보를 지금 바로 확인하러 가볼까요?
      </p>
      {/* 확인 아이콘 */}
      <img className="w-[160px] bg-[#e7e7e7] h-[160px] mt-[52px]" />
      <Link to={"/"} className="w-[480px]">
        <button className={BUTTON_COMMON_STYLE}>홈으로 돌아가기</button>
      </Link>
    </div>
  );
};
