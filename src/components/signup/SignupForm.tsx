import { useEffect, useState } from "react";
import { type HTMLInputTypeAttribute, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { type RegisterOptions, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { signup } from "api/supabase";
import { Select } from "components/input";
import { useAuthStore } from "store";

import { emailOptions, phoneOptions } from "./constant";
import { InvalidText } from "./InvalidText";

export interface SignupInputs {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
  phone: number;
}

type UseFormInput = (
  content: keyof SignupInputs,
  placeholder: string,
  type: HTMLInputTypeAttribute,
  validation?: RegisterOptions<SignupInputs, keyof SignupInputs>,
) => ReactNode;

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

export const SignupForm = ({ prevStep, nextStep }: Props) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({ mode: "all" });

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      await signup(data);
      nextStep();
    } catch (error) {
      console.error("error:", error);
    }
  };

  const useFormInput: UseFormInput = (content, placeholder, type, validation) => {
    return (
      <>
        <input
          {...register(content, validation)}
          type={type}
          placeholder={placeholder}
          className="w-full px-[24px] py-[12px] border-[1px] border-[#888888] focus:outline-none"
        />
      </>
    );
  };

  useEffect(() => {
    if (currentSession !== null) {
      alert(`현재 로그인 상태입니다.
      잘못된 접근입니다.`);
      navigate("/");
    }
  }, []);

  const [selectEmail, setSelectEmail] = useState<string | undefined>();
  const [phoneEmail, setPhoneEmail] = useState<string | undefined>();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[32px] font-[700] leading-[130%] mt-[40px]">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[480px] flex-col items-center mt-[40px]">
        <div className="flex items-center w-full">
          <div className="w-[180px]">
            {useFormInput("email", "이메일", "text", {
              required: "이메일을 입력해주세요.",
              minLength: { value: 8, message: "이메일이 너무 짧습니다." },
            })}
          </div>
          <span className="mx-[8px]">@</span>
          <Select
            option={emailOptions}
            selectedValue={selectEmail}
            setSelectedValue={setSelectEmail}
            selfEnterOption={true}
            size={{ width: "180px", height: "50px" }}
          />
          {/* <button className="w-[70px] bg">중복 체크</button> */}
          <button type="button" className="h-[50px] text-white bg-[#888] ml-[8px] px-[20px] whitespace-nowrap">
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.email?.message} />
        <div className="flex items-center w-full">
          {useFormInput("nickname", "닉네임", "text", {
            required: "닉네임을 입력해주세요.",
            minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
          })}
          <button type="button" className="h-[50px] text-white bg-[#888] ml-[8px] px-[20px] whitespace-nowrap">
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.nickname?.message} />

        {useFormInput("password", "비밀번호", "password", {
          required: "비밀번호를 입력해주세요.",
          minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
        })}
        <InvalidText errorsMessage={errors.password?.message} />

        {useFormInput("passwordCheck", "비밀번호", "password", { required: true })}
        <InvalidText errorsMessage={errors.passwordCheck?.message} />

        <div className="flex items-center w-full">
          <Select
            option={phoneOptions}
            selectedValue={phoneEmail}
            setSelectedValue={setPhoneEmail}
            selfEnterOption={true}
            size={{ width: "120px", height: "50px" }}
            placeholder="phone"
          />
          <span className="mx-[8px]">-</span>
          {useFormInput("phone", "휴대전화", "tel")}
          <span className="mx-[8px]">-</span>
          {useFormInput("phone", "휴대전화", "tel")}
        </div>
        <InvalidText errorsMessage={errors.phone?.message} />

        <button className="w-full h-[48px] text-white bg-[#888] mt-[24px]">회원가입</button>
        <button type="button" onClick={prevStep} className="w-full h-[48px] text-white bg-[#888] mt-[12px]">
          이전
        </button>
      </form>
    </div>
  );
};
