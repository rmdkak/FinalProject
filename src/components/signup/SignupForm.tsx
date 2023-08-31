import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchUserCheckData, signup } from "api/supabase";
import { type PasswordVisible, PasswordVisibleButton, Select } from "components";
import { useAuthStore } from "store";

import { emailOptions, phoneOptions } from "./constant";
import { InvalidText } from "./InvalidText";
import { SignupStep } from "./SignupStep";

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

const DUPLICATE_CHECK_BUTTON =
  "auth-button-text h-[48px] text-black bg-white px-[20px] whitespace-nowrap border border-black rounded-[8px] white-button-hover";
const NEXT_PREV_BUTTON = "auth-button auth-button-text text-black mt-[24px]";

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
        ? setError("name", { message: "이미 존재하는 닉네임입니다." })
        : setError("id", { message: "이미 존재하는 이메일입니다." });
    }
  };

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { phoneMiddleNum, phoneLastNum, id } = data;

    if (selectEmail === undefined) {
      setError("id", { message: "email을 선택해주세요." });
      return;
    }
    if (selectPhoneFistNum === undefined) {
      setError("phoneMiddleNum", { message: "휴대전화 앞자리를 선택해주세요." });
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

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const email = `${id}@${selectEmail}`;
    if (!emailPattern.test(email)) {
      setError("id", { message: "이메일 형식이 올바르지 않습니다." });
      return;
    }
    const phonePattern = /^01([0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const phone = `${selectPhoneFistNum}${phoneMiddleNum}${phoneLastNum}`;
    if (!phonePattern.test(phone)) {
      setError("phoneMiddleNum", { message: "휴대전화 형식이 올바르지 않습니다." });
      return;
    }

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
    <div className="items-center flex-column mt-[80px] w-[560px] mx-auto">
      <div className="w-full text-center underline-pb">
        <p className="title-3 mt-[40px]">회원가입</p>
      </div>
      <SignupStep step={1} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[480px] flex-col items-center mt-[40px]">
        {/* 이메일 */}
        <label className="self-start body-4 my-[8px]">이메일</label>
        <div className="flex items-center gap-[8px] w-full">
          <div className="flex-column w-[610px]">
            <input
              {...register("id", {
                required: "이메일을 입력해주세요.",
                minLength: { value: 4, message: "id가 너무 짧습니다." },
                maxLength: { value: 20, message: "id가 너무 깁니다." },
                onChange: () => {
                  setCheckedDuplicate({ ...checkedDuplicate, email: false });
                },
              })}
              type="id"
              placeholder="이메일"
              className="auth-input body-3"
            />
          </div>
          <span className="body-3">@</span>
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
        {checkedDuplicate.email ? (
          <p className={"h-[30px] w-full flex items-center text-[12px] text-green-500 font-normal"}>
            사용 가능한 이메일입니다.
          </p>
        ) : (
          <InvalidText errorsMessage={errors.id?.message} size={30} />
        )}

        {/* 닉네임 */}
        <label className="self-start body-4 my-[8px]">닉네임</label>
        <div className="flex items-center gap-[8px] w-full">
          <input
            {...register("name", {
              required: "닉네임을 입력해주세요.",
              minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
              maxLength: { value: 10, message: "닉네임이 너무 깁니다." },
              onChange: () => {
                setCheckedDuplicate({ ...checkedDuplicate, name: false });
              },
            })}
            type="text"
            placeholder="닉네임"
            className="auth-input body-3"
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
        {checkedDuplicate.name ? (
          <p className={"h-[30px] w-full flex items-center text-[12px] text-green-500 font-normal"}>
            사용 가능한 닉네임입니다.
          </p>
        ) : (
          <InvalidText errorsMessage={errors.name?.message} size={30} />
        )}

        {/* 비밀번호 */}
        <label className="self-start body-4 my-[8px]">비밀번호</label>
        <div className="relative flex items-center gap-[8px] w-full">
          {/* <div className="relative flex w-full"> */}
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
              },
              minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
              validate: {
                matchesPreviousPassword: (value) => {
                  const prevPassword = getValues("password");
                  return prevPassword === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
            type={showPassword.password ? "text" : "password"}
            placeholder="비밀번호"
            className="auth-input body-3"
          />
          <PasswordVisibleButton
            passwordType={"password"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative flex w-full mt-[8px]">
          <input
            {...register("passwordCheck")}
            type={showPassword.passwordConfirm ?? false ? "text" : "password"}
            placeholder="비밀번호 확인"
            className="auth-input body-3"
          />
          <PasswordVisibleButton
            passwordType={"passwordConfirm"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        <InvalidText errorsMessage={errors.password?.message} size={30} />

        {/* 휴대전화 */}
        <label className="self-start body-4 my-[8px]">휴대폰 번호</label>
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
            {...register("phoneMiddleNum")}
            type="text"
            placeholder="휴대전화"
            className="text-center auth-input body-3"
          />
          <span className="mx-[12px]">-</span>
          <input
            {...register("phoneLastNum")}
            type="text"
            placeholder="휴대전화"
            className="text-center auth-input body-3"
          />
        </div>
        <InvalidText errorsMessage={errors.phoneMiddleNum?.message} size={30} />

        <button className={`${NEXT_PREV_BUTTON} bg-point point-button-hover`}>회원가입</button>
        <button
          className={`${NEXT_PREV_BUTTON} bg-white border border-black white-button-hover`}
          type="button"
          onClick={prevStep}
        >
          이전
        </button>
      </form>
    </div>
  );
};
