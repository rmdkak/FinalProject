import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { fetchUserCheckData, signup } from "api/supabase/auth";
import { PasswordVisibleButton, Select, Title } from "components";
import { useAuthStore } from "store";

import { emailOptions, idQuestionOptions, idAnswerValid, idValid, nameValid, passwordValid } from "./constant";
import { InvalidText } from "./InvalidText";
import { SignupStep } from "./SignupStep";

import type { PasswordVisible } from "components";

export interface SignupInputs {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  idAnswer: string;
}

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const DUPLICATE_CHECK_BUTTON =
  "auth-button-text h-12 text-black px-5 whitespace-nowrap rounded-lg white-outline-button sm:w-full";
const SIGNUP_BUTTON = "auth-button auth-button-text text-black my-3";

export const SignupForm = ({ prevStep, nextStep }: Props) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();
  const [selectEmail, setSelectEmail] = useState<string | undefined>();
  const [selectIdQuestion, setSelectIdQuestion] = useState<string | undefined>();

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
    const inputIdValue = getValues("id");
    const inputNameValue = getValues("name");

    if (target === "email" && inputIdValue.trim() === "") {
      setCheckedDuplicate({ ...checkedDuplicate, email: false });
      setError("id", { message: "이메일을 입력해주세요." });
      return;
    }

    if (target === "name" && inputNameValue.trim() === "") {
      setCheckedDuplicate({ ...checkedDuplicate, name: false });
      setError("name", { message: "닉네임을 입력해주세요." });
      return;
    }

    if (selectEmail === undefined) {
      setError("id", { message: "이메일을 선택해주세요." });
      return;
    }

    const matchUser = fetchUserData.filter((user) =>
      target === "name" ? user.name === inputNameValue : user.email === `${inputIdValue}@${selectEmail}`,
    );

    if (matchUser === null || matchUser.length === 0) {
      setCheckedDuplicate({ ...checkedDuplicate, [target]: true });
    } else {
      target === "name"
        ? setError("name", { message: "이미 존재하는 닉네임입니다." })
        : setError("id", { message: "이미 존재하는 이메일입니다." });
    }
  };

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    const { id } = data;

    if (selectEmail === undefined) {
      setError("id", { message: "이메일을 선택해주세요." });
      return;
    }
    if (selectIdQuestion === undefined) {
      setError("idAnswer", { message: "본인확인 질문을 선택해주세요." });
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

    const emailPattern = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const email = `${id}@${selectEmail}`;
    if (!emailPattern.test(email)) {
      setError("id", { message: "이메일 형식이 올바르지 않습니다." });
      return;
    }
    if (email === `@${selectEmail}`) {
      setError("id", { message: "ID를 입력해주세요." });
      return;
    }

    try {
      await signup({ ...data, email, selectIdQuestion });
      toast("회원가입 되었습니다.", { theme: "plain", zIndex: 9999 });
      nextStep();
    } catch (error) {
      console.error("error:", error);
      toast("회원가입에 실패하였습니다.", { theme: "failure", zIndex: 9999 });
      switch (error) {
        case "User already registered":
          setError("root", { message: "이미 등록된 사용자입니다." });
          break;
      }
    }
  };

  useEffect(() => {
    if (currentSession !== null) {
      toast("현재 로그인 상태입니다.", { theme: "failure", zIndex: 9999 });
      navigate("/");
    }
  }, []);

  return (
    <div className="items-center mx-auto max-w-[560px] flex-column my-14 sm:my-6">
      <Title title="회원가입" isBorder={true} pathName="signup" />
      <SignupStep step={1} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[85%] flex-col items-center my-5">
        {/* 이메일 */}
        <label htmlFor="email" className="self-start my-2 body-4">
          이메일 주소
        </label>
        <div className="flex items-center w-full gap-2 sm:flex-col">
          <div className="flex items-center self-stretch contents-center">
            <input
              {...register("id", {
                ...idValid,
                onChange: () => {
                  setCheckedDuplicate({ ...checkedDuplicate, email: false });
                },
              })}
              id="email"
              type="id"
              placeholder="이메일"
              className="w-full auth-input body-3"
            />
            <span className="w-[13px] mx-2 text-center body-3">@</span>
            <Select
              option={emailOptions}
              selectedValue={selectEmail}
              setSelectedValue={setSelectEmail}
              selfEnterOption={true}
              checkedDuplicate={checkedDuplicate}
              setCheckedDuplicate={setCheckedDuplicate}
            />
          </div>
          <button
            type="button"
            className={DUPLICATE_CHECK_BUTTON}
            onClick={() => {
              duplicateCheck("email");
            }}
          >
            중복확인
          </button>
        </div>

        {checkedDuplicate.email ? (
          errors.id?.message !== undefined ? (
            <InvalidText errorsMessage={errors.id?.message} size={30} />
          ) : (
            <p className="flex items-center w-full h-[30px] text-green-500 body-3">사용 가능한 이메일입니다.</p>
          )
        ) : (
          <InvalidText errorsMessage={errors.id?.message} size={30} />
        )}

        {/* 닉네임 */}
        <label htmlFor="nickname" className="self-start my-2 body-4">
          닉네임
        </label>
        <div className="flex items-center w-full gap-2 sm:flex-col">
          <div className="flex items-center self-stretch w-full contents-center">
            <input
              id="nickname"
              type="text"
              placeholder="닉네임"
              className="w-full auth-input body-3"
              {...register("name", {
                ...nameValid,
                onChange: () => {
                  setCheckedDuplicate({ ...checkedDuplicate, name: false });
                },
              })}
            />
          </div>
          <button
            type="button"
            className={DUPLICATE_CHECK_BUTTON}
            onClick={() => {
              duplicateCheck("name");
            }}
          >
            중복확인
          </button>
        </div>
        {checkedDuplicate.name && errors.name?.message !== null ? (
          <p className="flex items-center w-full h-[30px] text-green-500  body-4">사용 가능한 닉네임입니다.</p>
        ) : (
          <InvalidText errorsMessage={errors.name?.message} size={30} />
        )}

        {/* 비밀번호 */}
        <label htmlFor="password" className="self-start my-2 body-4">
          비밀번호
        </label>
        <div className="relative flex items-center w-full gap-2">
          <input
            type={showPassword.password ? "text" : "password"}
            id="password"
            placeholder="비밀번호"
            className="auth-input body-3"
            {...register("password", {
              ...passwordValid(),
              validate: (_, formValue) =>
                formValue.password === formValue.passwordCheck || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <PasswordVisibleButton
            passwordType={"password"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative flex w-full mt-2">
          <input
            type={showPassword.passwordConfirm ?? false ? "text" : "password"}
            placeholder="비밀번호 확인"
            className="auth-input body-3"
            {...register("passwordCheck")}
          />
          <PasswordVisibleButton
            passwordType={"passwordConfirm"}
            isVisibleState={showPassword}
            setIsVisibleState={setShowPassword}
          />
        </div>
        {errors.password?.message === undefined ? (
          <p className="flex items-center w-full h-[30px] font-light text-black body-4">
            비밀번호는 영문,숫자,특수문자 포함 8자 이상으로 설정해주세요.
          </p>
        ) : (
          <InvalidText errorsMessage={errors.password?.message} size={30} />
        )}

        <div className="w-full gap-2 flex-column">
          <Select
            placeholder={"본인확인 질문을 선택해주세요."}
            option={idQuestionOptions}
            selectedValue={selectIdQuestion}
            setSelectedValue={setSelectIdQuestion}
            selfEnterOption={false}
          />
          <input
            placeholder="본인확인 질문에 답변해주세요."
            className="auth-input"
            {...register("idAnswer", { ...idAnswerValid })}
          />
        </div>
        <InvalidText errorsMessage={errors.idAnswer?.message} size={30} />

        <button className={`${SIGNUP_BUTTON} point-button`}>회원가입</button>
        <button className={`${SIGNUP_BUTTON} white-outline-button`} type="button" onClick={prevStep}>
          이전
        </button>
      </form>
    </div>
  );
};
