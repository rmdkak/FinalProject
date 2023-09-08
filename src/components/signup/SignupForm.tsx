import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchUserCheckData, signup } from "api/supabase";
import { type PasswordVisible, PasswordVisibleButton, Select, useDialog, SignupTitle } from "components";
import { useAuthStore } from "store";

import { emailOptions, idQuestionOptions, idAnswerValid, idValid, nameValid, passwordValid } from "./constant";
import { InvalidText } from "./InvalidText";
import { SignupStep } from "./SignupStep";

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
  "auth-button-text h-12 text-black px-5 whitespace-nowrap rounded-lg white-outline-button";
const SIGNUP_BUTTON = "auth-button auth-button-text text-black my-3";

export const SignupForm = ({ prevStep, nextStep }: Props) => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();
  const { Alert } = useDialog();
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
  } = useForm<SignupInputs>({ mode: "onSubmit" });

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
      target === "name" ? user.name === inputIdValue : user.email === `${inputNameValue}@${selectEmail}`,
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
      nextStep();
    } catch (error) {
      console.error("error:", error);
      switch (error) {
        case "User already registered":
          setError("root", { message: "이미 등록된 사용자입니다." });
          break;
      }
    }
  };

  useEffect(() => {
    if (currentSession !== null) {
      void Alert("현재 로그인 상태입니다.");
      navigate("/");
    }
  }, []);

  return (
    <div className="items-center flex-column m-5 w-[560px] mx-auto">
      <SignupTitle />
      <SignupStep step={1} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[480px] flex-col items-center my-5">
        {/* 이메일 */}
        <label htmlFor="email" className="self-start my-2 body-4">
          이메일
        </label>
        <div className="flex items-center w-full gap-2">
          <div className="flex-column w-[610px]">
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
              className="auth-input body-3"
            />
          </div>
          <span className="body-3">@</span>
          <Select
            option={emailOptions}
            selectedValue={selectEmail}
            setSelectedValue={setSelectEmail}
            selfEnterOption={true}
            checkedDuplicate={checkedDuplicate}
            setCheckedDuplicate={setCheckedDuplicate}
          />
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
            <p className={"h-[30px] w-full flex items-center text-[12px] text-green-500 font-normal"}>
              사용 가능한 이메일입니다.
            </p>
          )
        ) : (
          <InvalidText errorsMessage={errors.id?.message} size={30} />
        )}

        {/* 닉네임 */}
        <label htmlFor="nickname" className="self-start my-2 body-4">
          닉네임
        </label>
        <div className="flex items-center w-full gap-2">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임"
            className="auth-input body-3"
            {...register("name", {
              ...nameValid,
              onChange: () => {
                setCheckedDuplicate({ ...checkedDuplicate, name: false });
              },
            })}
          />
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
          <p className={"h-[30px] w-full flex items-center text-[12px] text-green-500 font-normal"}>
            사용 가능한 닉네임입니다.
          </p>
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
              ...passwordValid(getValues("passwordCheck")),
            })}
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
        <InvalidText errorsMessage={errors.password?.message} size={30} />

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
