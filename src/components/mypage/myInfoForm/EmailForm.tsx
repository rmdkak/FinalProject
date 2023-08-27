import { type SubmitHandler, useForm } from "react-hook-form";

import { changeEmail } from "api/supabase";
import { InvalidText } from "components/signup/InvalidText";

import { INPUT_STYLE, type ICommonProps, BUTTON_STYLE } from "../MyInfo";

interface EmailInput {
  email: string;
}

// TODO 이메일 변경
export const EmailForm = ({ initialState, patchIsOpen, setPatchIsOpen, provider, currentUser }: ICommonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>();

  const onSubmit: SubmitHandler<EmailInput> = async (data) => {
    const { email } = data;
    await changeEmail(email);
    setPatchIsOpen({ ...initialState, email: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <input
        placeholder={"이메일"}
        disabled={!patchIsOpen.email}
        defaultValue={currentUser?.email}
        className={INPUT_STYLE}
        {...register("email", {
          required: "이메일은 필수 입력 사항입니다.",
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "이메일 형식이 올바르지 않습니다.",
          },
        })}
      />
      <InvalidText errorsMessage={errors.email?.message} />
      {patchIsOpen.email ? (
        <div className="relative flex w-[70px]">
          <button type="button" className={BUTTON_STYLE}>
            수정
          </button>
          <button
            type="button"
            onClick={() => {
              setPatchIsOpen({ ...initialState, email: false });
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
              setPatchIsOpen({ ...initialState, email: true });
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
