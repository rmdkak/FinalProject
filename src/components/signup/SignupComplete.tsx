import { Link } from "react-router-dom";

import checkCircle from "assets/checkCircle.svg";
import { useAuthStore } from "store";

import { SignupStep } from "./SignupStep";

export const SignupComplete = () => {
  const { currentSession } = useAuthStore();
  const name = currentSession?.user.user_metadata.name as string;

  return (
    <div className="items-center flex-column mt-[80px] w-[560px] mx-auto">
      <div className="w-full text-center underline-pb">
        <p className="title-3 mt-[40px]">회원가입</p>
      </div>
      <SignupStep step={2} />
      <p className="text-[24px] font-normal leading-[130%]">{`${name}님, 환영합니다!`}</p>
      <p className="text-[14px] font-light leading-[130%] mt-[12px]">
        더 많은 인테리어 정보를 지금 바로 확인하러 가볼까요?
      </p>
      <img src={checkCircle} className="w-[80px] h-[80px] my-[40px]" />
      <Link to={"/"} className="w-[480px]">
        <button className="text-black auth-button-text auth-button bg-point point-button-hover">홈으로 돌아가기</button>
      </Link>
    </div>
  );
};
