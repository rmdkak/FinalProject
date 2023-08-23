import { useEffect, useState } from "react";
import { type HTMLInputTypeAttribute, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { type RegisterOptions, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { signup } from "api/supabase";
import { Select } from "components/input";
import { BUTTON_COMMON_STYLE } from "pages";
import { useAuthStore } from "store";

import { emailOptions, phoneOptions } from "./constant";
import { InvalidText } from "./InvalidText";

export interface SignupInputs {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  phoneMiddleNum: string;
  phoneLastNum: string;
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

const DUPLICATE_CHECK_BUTTON = "h-[50px] text-white bg-[#888] ml-[8px] px-[20px] whitespace-nowrap";

export const SignupForm = ({ prevStep, nextStep }: Props) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();

  const [selectEmail, setSelectEmail] = useState<string | undefined>();
  const [selectPhoneFistNum, setSelectPhoneFistNum] = useState<string | undefined>();

  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedName, setCheckedName] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInputs>({ mode: "all" });

  useEffect(() => {
    const getUsers = async () => {
      // const { data, error } = await auth.admin.listUsers();
      // console.log("users :", data);
      // console.log("error :", error);
    };
    void getUsers();
  }, []);

  // 중복체크
  const emailDuplicateCheck = () => {
    setCheckedEmail(true);
  };
  const nameDuplicateCheck = () => {
    setCheckedName(true);
  };

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { phoneMiddleNum, phoneLastNum, id } = data;

    if (selectEmail === undefined) {
      setError("id", { message: "email을 선택해주세요." });
      return;
    }
    if (!checkedEmail) {
      setError("id", { message: "중복 체크를 해주세요." });
      return;
    }
    if (!checkedName) {
      setError("name", { message: "중복 체크를 해주세요." });
      return;
    }
    if (
      selectPhoneFistNum === undefined ||
      phoneMiddleNum.length < 3 ||
      phoneMiddleNum.length > 4 ||
      phoneLastNum.length !== 4 ||
      selectPhoneFistNum.length !== 3
    ) {
      setError("phoneMiddleNum", { message: "휴대전화 형식이 올바르지 않습니다." });
      return;
    }

    const email = `${id}@${selectEmail}`;

    const phone = `${selectPhoneFistNum}-${phoneMiddleNum}-${phoneLastNum}`;

    try {
      await signup({ ...data, email, phone });
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

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[32px] font-[700] leading-[130%] mt-[40px]">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[480px] flex-col items-center mt-[40px]">
        <div className="flex items-center w-full">
          <div className="max-w-[180px]">
            {useFormInput("id", "이메일", "id", { required: "이메일을 입력해주세요." })}
          </div>
          <span className="mx-[8px]">@</span>
          <Select
            option={emailOptions}
            selectedValue={selectEmail}
            setSelectedValue={setSelectEmail}
            selfEnterOption={true}
          />
          {/* <button className="w-[70px] bg">중복 체크</button> */}
          <button type="button" className={DUPLICATE_CHECK_BUTTON} onClick={emailDuplicateCheck}>
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.id?.message} />
        <div className="flex items-center w-full">
          {useFormInput("name", "닉네임", "text", {
            required: "닉네임을 입력해주세요.",
            minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
          })}
          <button type="button" className={DUPLICATE_CHECK_BUTTON} onClick={nameDuplicateCheck}>
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.name?.message} />

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
            selectedValue={selectPhoneFistNum}
            setSelectedValue={setSelectPhoneFistNum}
            selfEnterOption={true}
            placeholder="phone"
          />
          <span className="mx-[8px]">-</span>
          {useFormInput("phoneMiddleNum", "휴대전화", "text", {
            minLength: { value: 3, message: "휴대전화 형식이 올바르지 않습니다." },
            maxLength: { value: 4, message: "휴대전화 형식이 올바르지 않습니다." },
          })}
          <span className="mx-[8px]">-</span>
          {useFormInput("phoneLastNum", "휴대전화", "text", {
            minLength: { value: 4, message: "휴대전화 형식이 올바르지 않습니다." },
            maxLength: { value: 4, message: "휴대전화 형식이 올바르지 않습니다." },
          })}
        </div>
        <InvalidText errorsMessage={errors.phoneMiddleNum?.message} />
        <InvalidText errorsMessage={errors.phoneLastNum?.message} />

        <button className={BUTTON_COMMON_STYLE}>회원가입</button>
        <button className={BUTTON_COMMON_STYLE} type="button" onClick={prevStep}>
          이전
        </button>
      </form>
    </div>
  );
};
