import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchUserCheckData, signup } from "api/supabase";
import { type PasswordVisible, PasswordVisibleButton } from "components/button";
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

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const INPUT_STYLE = "w-full px-[24px] py-[12px] border-[1px] border-[#888888] focus:outline-none";
const DUPLICATE_CHECK_BUTTON = "h-[50px] text-white bg-[#888] ml-[8px] px-[20px] whitespace-nowrap";

export const SignupForm = ({ prevStep, nextStep }: Props) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();

  const [selectEmail, setSelectEmail] = useState<string | undefined>();
  const [selectPhoneFistNum, setSelectPhoneFistNum] = useState<string | undefined>();

  const [checkedDuplicate, setCheckedDuplicate] = useState({ email: false, name: false });
  const [fetchUserData, setFetchUserData] = useState([{ email: "", name: "" }]);
  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignupInputs>({ mode: "all" });

  useEffect(() => {
    const getUsers = async () => {
      const getUserData = await fetchUserCheckData();
      setFetchUserData(getUserData);
    };
    void getUsers();
  }, []);

  // 중복체크
  const duplicateCheck = (target: "email" | "name") => {
    if (selectEmail === undefined) {
      setError("id", { message: "email을 선택해주세요." });
      return;
    }
    const matchUser = fetchUserData.filter((user) => {
      return target === "name" ? user.name === getValues("name") : user.email === `${getValues("id")}@${selectEmail}`;
    });
    if (matchUser === null || matchUser.length === 0) {
      setCheckedDuplicate({ ...checkedDuplicate, [target]: true });
    } else {
      target === "name"
        ? setError("name", { message: "이미 존재하는 닉네임입니다.." })
        : setError("id", { message: "이미 존재하는 이메일입니다." });
    }
  };

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { phoneMiddleNum, phoneLastNum, id } = data;

    if (selectEmail === undefined) {
      setError("id", { message: "email을 선택해주세요." });
      return;
    }
    if (!checkedDuplicate.email) {
      setError("id", { message: "중복 체크를 해주세요." });
      return;
    }
    if (!checkedDuplicate.name) {
      setError("name", { message: "중복 체크를 해주세요." });
      return;
    }
    if (selectPhoneFistNum === undefined || !/^[0-9]{3}$/.test(selectPhoneFistNum)) {
      setError("phoneMiddleNum", { message: "휴대전화 형식이 올바르지 않습니다." });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const email = `${id}@${selectEmail}`;

    if (!emailPattern.test(email)) {
      setError("id", { message: "이메일 형식이 올바르지 않습니다." });
      return;
    }
    const phone = `${selectPhoneFistNum}${phoneMiddleNum}${phoneLastNum}`;

    try {
      await signup({ ...data, email, phone });
      nextStep();
    } catch (error) {
      console.error("error:", error);
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
      <h2 className="text-[32px] font-[700] leading-[130%] mt-[40px]">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[480px] flex-col items-center mt-[40px]">
        {/* 이메일 */}
        <div className="flex items-center w-full">
          <div className="w-[600px]">
            <input
              {...register("id", {
                required: "이메일을 입력해주세요.",
                minLength: { value: 4, message: "id가 너무 짧습니다." },
                maxLength: { value: 20, message: "id가 너무 깁니다." },
              })}
              type="id"
              placeholder="이메일"
              className={INPUT_STYLE}
            />
          </div>
          <span className="mx-[8px]">@</span>
          <Select
            option={emailOptions}
            selectedValue={selectEmail}
            setSelectedValue={setSelectEmail}
            selfEnterOption={true}
          />
          <button
            type="button"
            className={DUPLICATE_CHECK_BUTTON}
            onClick={() => {
              duplicateCheck("email");
            }}
          >
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.id?.message} />
        <div className="flex items-center w-full">
          <input
            {...register("name", {
              required: "닉네임을 입력해주세요.",
              minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
              maxLength: { value: 10, message: "닉네임이 너무 깁니다." },
            })}
            type="text"
            placeholder="닉네임"
            className={INPUT_STYLE}
          />
          <button
            type="button"
            className={DUPLICATE_CHECK_BUTTON}
            onClick={() => {
              duplicateCheck("name");
            }}
          >
            중복 체크
          </button>
        </div>
        <InvalidText errorsMessage={errors.name?.message} />

        <div className="relative flex w-full">
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
              },
              minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
            })}
            type={showPassword.password ? "text" : "password"}
            placeholder="비밀번호"
            className={INPUT_STYLE}
          />
          <PasswordVisibleButton
            passwordType={"password"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        <InvalidText errorsMessage={errors.password?.message} />

        <div className="relative flex w-full">
          <input
            {...register("passwordCheck", {
              required: "비밀번호를 입력해주세요.",
              validate: {
                matchesPreviousPassword: (value) => {
                  const prevPassword = getValues("password");
                  return prevPassword === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
            type={showPassword.passwordConfirm ?? false ? "text" : "password"}
            placeholder="비밀번호"
            className={INPUT_STYLE}
          />
          <PasswordVisibleButton
            passwordType={"passwordConfirm"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        <InvalidText errorsMessage={errors.passwordCheck?.message} />

        <div className="flex items-center w-full">
          <Select
            option={phoneOptions}
            selectedValue={selectPhoneFistNum}
            setSelectedValue={setSelectPhoneFistNum}
            selfEnterOption={true}
            placeholder="phone"
          />
          <span className="mx-[12px]">-</span>
          <input
            {...register("phoneMiddleNum", {
              pattern: { value: /^[0-9]{3,4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
            })}
            type="text"
            placeholder="휴대전화"
            className={`${INPUT_STYLE} text-center`}
          />
          <span className="mx-[12px]">-</span>
          <input
            {...register("phoneLastNum", {
              pattern: { value: /^[0-9]{4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
            })}
            type="text"
            placeholder="휴대전화"
            className={`${INPUT_STYLE} text-center`}
          />
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
