import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGripLinesVertical } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { login } from "api/supabase";
import { INPUT_STYLE, SocialLogin } from "components";
import { InvalidText } from "components/signup/InvalidText";
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
    <div className="flex flex-col items-center">
      <h2 className="text-[2rem] mt-[4.375rem] mb-10 font-bold">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[30rem] w-2/3">
        <label htmlFor="email" className="absolute top-[-9999px] left-[-9999px] ">
          email
        </label>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            minLength: { value: 8, message: "이메일이 너무 짧습니다." },
          })}
          placeholder="이메일"
          className={INPUT_STYLE}
        />
        <InvalidText errorsMessage={errors.email?.message} />

        <label htmlFor="password" className="absolute top-[-9999px] left-[-9999px] ">
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
          {showPassword.password ? (
            <AiOutlineEyeInvisible
              className="h-[50px] absolute right-2 top-[50%] translate-y-[-50%] text-[25px] cursor-pointer"
              onClick={() => {
                setShowPassword({ ...showPassword, password: false });
              }}
            />
          ) : (
            <AiOutlineEye
              className="h-[50px] absolute right-2 top-[50%] translate-y-[-50%] text-[25px] cursor-pointer"
              onClick={() => {
                setShowPassword({ ...showPassword, password: true });
              }}
            />
          )}
        </div>
        <InvalidText errorsMessage={errors.password?.message} />

        <p>{errors.password?.message}</p>
        <div className="flex items-center justify-between h-12 mt-4 text-[#888] ">
          <div className="flex items-center ">
            <input
              type="checkbox"
              id="loginStatus"
              className="min-w-[1.5rem] min-h-[1.5rem] mr-2 "
              onChange={() => {
                setStayLoggedInStatus(!stayLoggedInStatus);
              }}
            />
            <label htmlFor="loginStatus" className="">
              아이디 저장
            </label>
          </div>
          <div className="flex">
            <button type="button" className="">
              이메일 찾기
            </button>
            <FaGripLinesVertical className="w-[24px] self-center text-center" />
            <Link to="/find-password">비밀번호 찾기</Link>
          </div>
        </div>

        <button className="w-full py-3.5 px-6 mt-6 mb-4 bg-[#888888] text-[#fff]  ">로그인</button>
        <SocialLogin />
        <div className="flex flex-col items-center justify-center">
          <p className="text-[#5f5f5f] text-[0.875rem] text-center mb-4">
            회원가입하고 더 많은 인터레어 조합을 확인해보세요!
          </p>
          <Link
            to={"/signup"}
            className="flex items-center justify-center bg-none border border-[#888]  w-full h-12 text-[0.875rem]"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

// 109 번째, 111 번째 이미지 넣어야함.
