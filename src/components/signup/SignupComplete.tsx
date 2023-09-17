import { Link } from "react-router-dom";

import checkCircle from "assets/svgs/checkCircle.svg";
import { Title } from "components";
import { useAuthStore } from "store";

import { SignupStep } from "./SignupStep";

export const SignupComplete = () => {
  const { currentSession } = useAuthStore();
  const name = currentSession?.user.user_metadata.name as string;

  return (
    <div className="items-center max-w-[560px] mx-auto flex-column my-14 sm:my-6 sm:w-[85%]">
      <Title title="회원가입" isBorder={true} pathName="signup" />
      <SignupStep step={2} />
      <p className="title-4">{`${name}님, 환영합니다!`}</p>
      <p className="mt-3 body-3">더 많은 인테리어 정보를 지금 바로 확인하러 가볼까요?</p>
      <img src={checkCircle} alt="회원가입 성공" className="w-20 h-20 my-10" />
      <Link to={"/"} className="w-full">
        <button className="text-black auth-button-text auth-button point-button">홈으로 돌아가기</button>
      </Link>
    </div>
  );
};
