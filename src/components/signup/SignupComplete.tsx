import { Link } from "react-router-dom";

export const SignupComplete = () => {
  // TODO 닉네임 가져오기
  const nickname = "홍길동";
  return (
    <div className="flex flex-col items-center">
      <p className="text-[32px] font-[700] leading-[130%] mt-[80px]">회원가입 완료</p>
      <p className="text-[20px] font-[400] leading-[130%] mt-[40px]">{`${nickname}님 환영합니다.`}</p>
      <p className="text-[14px] font-[300] leading-[130%] mt-[12px]">
        더 많은 인테리어 정보를 지금 바로 확인하러 가볼까요?
      </p>
      <img className=" w-[160px] bg-[#e7e7e7] h-[160px] mt-[52px]" />
      <Link to={"/"}>
        <button className="bg-[#888] w-[480px] h-[48px] text-white mt-[40px]">홈으로 돌아가기</button>
      </Link>
    </div>
  );
};
