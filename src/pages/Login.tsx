import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { login, githubLogin, googleLogin, kakaoLogin } from "api/supabase";
import githubLogo from "assets/githubLogo.svg";
import googleLogo from "assets/googleLogo.svg";
import kakaoLogo from "assets/kakaoLogo.svg";
import { CheckBoxIcon, INPUT_STYLE, PasswordVisibleButton, InvalidText } from "components";
import { useAuthStore, useLoggingStore } from "store";

export interface LoginInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const { stayLoggedInStatus, setStayLoggedInStatus } = useLoggingStore();
  const [showPassword, setShowPassword] = useState({ password: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      console.error("error :", error);
      // TODO 커스텀alert 로직
    }
  };

  useEffect(() => {
    if (currentSession !== null) {
      alert(`현재 로그인 상태입니다.
      잘못된 접근입니다.`);
      navigate("/");
    }
  }, []);

  return (
    <div className="w-[560px] flex flex-col items-center mx-auto">
      <h2 className="w-full text-center text-[32px] mt-[80px] pb-[24px] border-b-[1px] border-black font-[400] leading-[130%]">
        로그인
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[40px]">
        <label htmlFor="email" className="text-[12px] font-[400] leading-[110%] text-gray01">
          이메일
        </label>
        <div className="relative flex w-full">
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              minLength: { value: 8, message: "이메일이 너무 짧습니다." },
            })}
            placeholder="이메일을 입력해주세요."
            className={INPUT_STYLE}
          />
          <IoMdCloseCircle
            className="h-[16px] absolute right-[24px] top-[50%] translate-y-[-50%] text-[25px] text-gray04 cursor-pointer"
            onClick={() => {
              resetField("email");
            }}
          />
        </div>
        <InvalidText errorsMessage={errors.email?.message} />

        <label htmlFor="password" className="text-[12px] font-[400] leading-[110%] text-gray01">
          password
        </label>
        <div className="relative flex w-full">
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
            })}
            type={showPassword.password ? "text" : "password"}
            id="password"
            className={INPUT_STYLE}
            placeholder="비밀번호"
          />
          <PasswordVisibleButton
            passwordType={"password"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        <InvalidText errorsMessage={errors.password?.message} />

        <p>{errors.password?.message}</p>
        <div className="flex items-center justify-between h-[20px] mt-[24px] text-[#888888] ">
          <div className="flex items-center gap-[8px] h-full">
            <CheckBoxIcon checkState={stayLoggedInStatus} changeCheckState={setStayLoggedInStatus} size={20} />
            <p className="text-[12px] leading-[110%] self-center">로그인 유지</p>
          </div>

          <div className="flex gap-[8px] items-center">
            <Link to="/find-auth/email" className="text-[12px] leading-[110%] font-[400]">
              이메일 찾기
            </Link>

            <div className="w-[1px] h-[8px] bg-[#E5E5E5]"></div>

            <Link to="/find-auth/password" className="text-[12px] leading-[110%] font-[400]">
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <button className="w-full px-[24px] py-[12px] mt-[24px] bg-point rounded-[8px] text-[#1A1A1A] text-[14px] font-[500] leading-[130%]">
          로그인
        </button>

        <div className="w-full mt-[40px] h-[120px]">
          <div className="relative flex items-center justify-center h-[48px]">
            <div className="absolute w-full h-[1px] bg-[#D9D9D9] z-0" />
            <h3 className="w-[413] p-[12px] text-[14px] font-[400] leading-[24px] z-10 bg-[#FFFFFF]">
              SNS 계정으로 로그인하기
            </h3>
          </div>
          <div className="w-full flex items-stretch justify-center gap-[12px]">
            <button
              onClick={kakaoLogin}
              type="button"
              className="flex w-full items-center justify-center gap-[8px] border-[1px] rounded-[8px] text-[#666666] h-[48px] px-[24px] py-[12px]"
            >
              <img src={kakaoLogo} />
              <p>Kakao</p>
            </button>
            <button
              onClick={googleLogin}
              type="button"
              className="flex w-full items-center justify-center gap-[8px] border-[1px] rounded-[8px] text-[#666666] h-[48px] px-[24px] py-[12px]"
            >
              <img src={googleLogo} />
              Google
            </button>
            <button
              onClick={githubLogin}
              type="button"
              className="flex w-full items-center justify-center gap-[8px] border-[1px] rounded-[8px] text-[#666666] h-[48px] px-[24px] py-[12px]"
            >
              <img src={githubLogo} />
              Github
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-[24px] mt-[64px]">
          <p className="text-gray03 text-[14px] text-center mb-[16px]">
            회원가입하고 더 많은 인터레어 조합을 확인해보세요!
          </p>
          <Link
            to={"/signup"}
            className="flex items-center justify-center w-full h-[48px] rounded-[8px] bg-white border border-black text-[14px] font-medium leading-[130%]"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};
