import { type SubmitHandler, useForm } from "react-hook-form";

import { changePassword } from "api/supabase";
import { InvalidText } from "components/signup/InvalidText";

import { INPUT_STYLE, type ICommonProps, BUTTON_STYLE } from "../MyInfo";

interface PasswordInput {
  password: string;
  passwordConfirm: string;
}

export const PasswordForm = ({ initialState, patchIsOpen, setPatchIsOpen, provider }: ICommonProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordInput>({ mode: "all" });

  const onSubmit: SubmitHandler<PasswordInput> = async (data) => {
    const { password } = data;
    await changePassword(password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <div className="flex flex-col w-full gap-4">
        <input
          placeholder="비밀번호"
          type="password"
          disabled={!patchIsOpen.password}
          className={INPUT_STYLE}
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
            },
            minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
          })}
        />
        <InvalidText errorsMessage={errors.password?.message} />
        <input
          placeholder={"비밀번호 확인"}
          type="password"
          disabled={!patchIsOpen.password}
          className={INPUT_STYLE}
          {...register("passwordConfirm", {
            validate: {
              matchesPreviousPassword: (value) => {
                const prevPassword = getValues("password");
                return prevPassword === value || "비밀번호가 일치하지 않습니다.";
              },
            },
          })}
        />
        <InvalidText errorsMessage={errors.passwordConfirm?.message} />
      </div>
      {patchIsOpen.password ? (
        <div className="flex w-[70px]">
          <button type="button" className={BUTTON_STYLE}>
            수정
          </button>
          <button
            type="button"
            onClick={async () => {
              setPatchIsOpen({ ...initialState, password: false });
            }}
            className="absolute w-[70px] text-white bg-red-500 disabled:bg-[#bbb]"
          >
            x
          </button>
        </div>
      ) : (
        <div className="flex w-[70px]">
          <button
            type="button"
            onClick={() => {
              setPatchIsOpen({ ...initialState, password: true });
            }}
            disabled={provider === "kakao" || provider === "google" || provider === "github"}
            className={BUTTON_STYLE}
          >
            변경
          </button>
        </div>
      )}
    </form>
  );
};
