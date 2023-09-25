import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "api/supabase/auth";
import { PasswordVisibleButton, InvalidText, useDialog, SocialLogin, CheckBoxIcon } from "components";
import { useDynamicImport } from "hooks/useDynamicImport";
import { useMovePage } from "hooks/useMovePage";
import { loginSchema } from "schema/formSchema";
import { useAuthStore } from "store";

export interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { Alert } = useDialog();
  const { getCurrentPathname } = useMovePage();

  const { currentSession, stayLoggedInStatus, setStayLoggedInStatus } = useAuthStore();

  const [showPassword, setShowPassword] = useState({ password: false });

  const { preFetchPageBeforeEnter } = useDynamicImport();

  const resolver = yupResolver(loginSchema);
  const { register, handleSubmit, resetField, setError, formState } = useForm<LoginInputs>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await login(data);
      getCurrentPathname();
      toast("로그인 되었습니다.", { theme: "plain", zIndex: 9999 });
    } catch (error) {
      setError("root", { message: "로그인에 실패하였습니다." });
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
    <div className="max-w-[560px] min-w-[360px] box-border w-full flex-column my-10 items-center mx-auto sm:mt-2">
      <h2 className="w-full pb-6 text-center border-b border-black title-3 sm:hidden">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10 sm:px-6 sm:mt-6">
        <label htmlFor="email" className="text-[12px] font-normal leading-[110%] text-gray01">
          이메일
        </label>
        <div className="relative flex w-full">
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            className={`auth-input ${errors.email?.message === undefined ? "" : "border-error"} pr-12`}
          />
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[25px] text-gray04 cursor-pointer"
            type="button"
            onClick={() => {
              resetField("email");
            }}
          >
            <IoMdCloseCircle className="h-4" />
          </button>
        </div>
        <InvalidText errorsMessage={errors.email?.message} />

        <label htmlFor="password" className="text-[12px] font-normal leading-[110%] text-gray01">
          비밀번호
        </label>
        <div className="relative flex w-full">
          <input
            {...register("password")}
            id="password"
            type={showPassword.password ? "text" : "password"}
            autoComplete="off"
            placeholder="비밀번호"
            className={`auth-input ${errors.password?.message === undefined ? "" : "border-error"} pr-12`}
          />
          <PasswordVisibleButton
            passwordType={"password"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        <InvalidText errorsMessage={errors.password?.message} />

        <div className="flex items-center justify-between h-5 mt-4 text-gray02 sm:mt-0">
          <div className="flex items-center h-full">
            <input
              id="logging"
              type="checkbox"
              className="hidden"
              checked={stayLoggedInStatus}
              onChange={checkClickHandler}
            />
            <label
              htmlFor="logging"
              className="flex contents-center gap-2 text-[12px] leading-[110%] self-center cursor-pointer hover:text-black"
            >
              <CheckBoxIcon type="black" isCheck={stayLoggedInStatus} />
              로그인 유지
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/find-auth/email"
              className="text-[12px] leading-[110%] font-normal hover:text-black"
              onMouseEnter={async () => {
                await preFetchPageBeforeEnter("find-auth");
              }}
            >
              이메일 찾기
            </Link>

            <div className="w-[1px] h-2 bg-gray06"></div>

            <Link
              to="/find-auth/password"
              className="text-[12px] leading-[110%] font-normal hover:text-black"
              onMouseEnter={async () => {
                await preFetchPageBeforeEnter("find-auth");
              }}
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <button className="mt-6 text-black auth-button auth-button-text point-button">로그인</button>
        <InvalidText errorsMessage={errors.root?.message} />

        <div className="w-full mt-[30px] h-[120px]">
          <div className="relative flex h-12 contents-center">
            <div className="absolute w-full h-[1px] bg-[#D9D9D9] z-0" />
            <h3 className="w-[413] p-3 text-[14px] font-normal leading-[24px] z-10 bg-white">
              SNS 계정으로 로그인하기
            </h3>
          </div>
          <SocialLogin />
        </div>

        <div className="gap-6 mt-6 flex-column contents-center sm:gap-0 sm:mt-0">
          <p className="text-gray03 text-[14px] text-center mb-4">회원가입하고 더 많은 인테리어 조합을 확인해보세요!</p>
          <Link
            to={"/signup"}
            className="flex w-full h-12 rounded-lg auth-button-text contents-center white-outline-button"
            onMouseEnter={async () => {
              await preFetchPageBeforeEnter("signup");
            }}
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
