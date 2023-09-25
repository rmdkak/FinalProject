import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-simple-toasts";

import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "api/supabase/auth";
import { InvalidText, type PasswordVisible, PasswordVisibleButton } from "components";
import { updateUserPasswordSchema } from "schema/formSchema";

import { LABEL_STYLE } from "./UpdateUser";

interface Input {
  password: string;
  passwordConfirm: string;
}

interface Props {
  toggleChangeHandler: (target: "name" | "password") => void;
  isOpen: boolean;
}

export const PasswordForm = ({ toggleChangeHandler, isOpen }: Props) => {
  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });

  const resolver = yupResolver(updateUserPasswordSchema);
  const { register, handleSubmit, reset, formState } = useForm<Input>({ resolver });
  const { errors } = formState;

  const changePasswordHandler: SubmitHandler<Input> = async (data) => {
    try {
      await changePassword(data.password);
      toast("비밀번호가 정상적으로 변경되었습니다.", { theme: "warning", zIndex: 9999 });
    } catch (error) {}

    reset();
    toggleChangeHandler("password");
  };

  return (
    <div className="gap-2 border-b pb-7 flex-column border-b-gray06 md:contents-center sm:contents-center sm:w-full">
      <div className="flex gap-6 ">
        <label htmlFor="password" className={LABEL_STYLE}>
          비밀번호
        </label>
        <button
          id="password"
          type="button"
          onClick={() => {
            toggleChangeHandler("password");
          }}
          className="w-32 h-12 rounded-lg point-button body-3"
        >
          변경
        </button>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit(changePasswordHandler)} className="sm:w-full">
          <div className="flex-column gap-2 w-[300px] sm:w-full mt-10">
            <div className="relative">
              <input
                placeholder="새 비밀번호"
                type={showPassword.password ? "text" : "password"}
                className="auth-input"
                {...register("password")}
              />
              <PasswordVisibleButton
                passwordType={"password"}
                isVisibleState={showPassword}
                setIsVisibleState={setShowPassword}
              />
            </div>
            <div className="relative">
              <input
                placeholder={"새 비밀번호 확인"}
                type={showPassword.passwordConfirm ?? false ? "text" : "password"}
                className="auth-input"
                {...register("passwordConfirm")}
              />
              <PasswordVisibleButton
                passwordType={"passwordConfirm"}
                isVisibleState={showPassword}
                setIsVisibleState={setShowPassword}
              />
            </div>
          </div>
          <InvalidText className={"justify-center"} errorsMessage={errors.password?.message} size={40} />
          <div className="flex items-center justify-start gap-3 sm:justify-center">
            <button
              type="button"
              className="w-32 h-12 rounded-lg gray-outline-button body-3 sm:w-full md:w-full"
              onClick={() => {
                toggleChangeHandler("password");
              }}
            >
              취소
            </button>
            <button className="w-32 h-12 rounded-lg point-button body-3 sm:w-full md:w-full">수정</button>
          </div>
        </form>
      )}
    </div>
  );
};
