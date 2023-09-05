import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { login, githubLogin, googleLogin, kakaoLogin } from "api/supabase";
import githubLogo from "assets/githubLogo.svg";
import googleLogo from "assets/googleLogo.svg";
import kakaoLogo from "assets/kakaoLogo.svg";
import { PasswordVisibleButton, InvalidText, useDialog } from "components";
import { useAuthStore } from "store";

export interface LoginInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { Alert } = useDialog();
  const { currentSession, stayLoggedInStatus, setStayLoggedInStatus } = useAuthStore();
  const [showPassword, setShowPassword] = useState({ password: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      setError("root", { message: "일치하는 회원정보가 없습니다." });
    }
  };

  const checkClickHandler = () => {
    setStayLoggedInStatus(!stayLoggedInStatus);
  };

  useEffect(() => {
    if (currentSession !== null) {
      void Alert(
        <>
          <p>현재 로그인 상태입니다.</p>
          <p>잘못된 접근입니다.</p>
        </>,
      );
      navigate("/");
    }
  }, []);

  return (
    <div className="w-[560px] flex-column my-20 items-center mx-auto">
      <h2 className="w-full text-center pb-[24px] border-b border-black title-3">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[40px]">
        <label htmlFor="email" className="text-[12px] font-normal leading-[110%] text-gray01">
          이메일
        </label>
        <div className="relative flex w-full">
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              minLength: { value: 8, message: "이메일이 너무 짧습니다." },
            })}
            placeholder="이메일을 입력해주세요."
            className={`auth-input ${errors.email?.message === undefined ? "" : "border-error"}`}
          />
          <IoMdCloseCircle
            className="h-[16px] absolute right-[24px] top-[50%] translate-y-[-50%] text-[25px] text-gray04 cursor-pointer"
            onClick={() => {
              resetField("email");
            }}
          />
        </div>
        <InvalidText errorsMessage={errors.email?.message} />

        <label htmlFor="password" className="text-[12px] font-normal leading-[110%] text-gray01">
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
            className={`auth-input ${errors.password?.message === undefined ? "" : "border-error"}`}
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
        <div className="flex items-center justify-between h-[20px] mt-[24px] text-gray02">
          <div className="flex items-center h-full">
            <input
              id="logging"
              type="checkbox"
              checked={stayLoggedInStatus}
              className="hidden"
              onChange={checkClickHandler}
            />
            <label
              htmlFor="logging"
              className="flex contents-center gap-[8px] text-[12px] leading-[110%] self-center cursor-pointer hover:text-black"
            >
              {stayLoggedInStatus ? (
                <FaRegSquareCheck className="w-[20px] h-[20px] text-black" />
              ) : (
                <FaRegSquareCheck className="w-[20px] h-[20px] text-gray05" />
              )}
              {/* <CheckBoxIcon checkState={stayLoggedInStatus} changeCheckState={setStayLoggedInStatus} size={20} /> */}
              로그인 유지
            </label>
          </div>

          <div className="flex gap-[8px] items-center">
            <Link to="/find-auth/email" className="text-[12px] leading-[110%] font-normal hover:text-black">
              이메일 찾기
            </Link>

            <div className="w-[1px] h-[8px] bg-gray06"></div>

            <Link to="/find-auth/password" className="text-[12px] leading-[110%] font-normal hover:text-black">
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <button className="auth-button mt-[24px] text-black auth-button-text point-button">로그인</button>
        <InvalidText errorsMessage={errors.root?.message} />

        <div className="w-full mt-[40px] h-[120px]">
          <div className="relative flex contents-center h-[48px]">
            <div className="absolute w-full h-[1px] bg-[#D9D9D9] z-0" />
            <h3 className="w-[413] p-[12px] text-[14px] font-normal leading-[24px] z-10 bg-white">
              SNS 계정으로 로그인하기
            </h3>
          </div>
          <div className="w-full flex items-stretch justify-center gap-[12px]">
            <button
              onClick={kakaoLogin}
              type="button"
              className="flex w-full contents-center gap-[8px] border-[1px] rounded-[8px] text-gray01 h-[48px] px-[24px] py-[12px]"
            >
              <img src={kakaoLogo} />
              <p>Kakao</p>
            </button>
            <button
              onClick={googleLogin}
              type="button"
              className="flex w-full contents-center gap-[8px] border-[1px] rounded-[8px] text-gray01 h-[48px] px-[24px] py-[12px]"
            >
              <img src={googleLogo} />
              Google
            </button>
            <button
              onClick={githubLogin}
              type="button"
              className="flex w-full contents-center gap-[8px] border-[1px] rounded-[8px] text-gray01 h-[48px] px-[24px] py-[12px]"
            >
              <img src={githubLogo} />
              Github
            </button>
          </div>
        </div>

        <div className="flex-column contents-center gap-[24px] mt-[64px]">
          <p className="text-gray03 text-[14px] text-center mb-[16px]">
            회원가입하고 더 많은 인터레어 조합을 확인해보세요!
          </p>
          <Link
            to={"/signup"}
            className="auth-button-text flex contents-center w-full h-[48px] rounded-[8px] white-outline-button"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};
