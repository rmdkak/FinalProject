import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { changePassword } from "api/supabase/auth";
import { InvalidText } from "components";

interface UpdatePasswordInput {
  newPassword: string;
  newPasswordConfirm: string;
}

const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordInput>();

  const onSubmit: SubmitHandler<UpdatePasswordInput> = async (data) => {
    const { newPassword } = data;

    try {
      await changePassword(newPassword);
      toast("비밀번호가 정상적으로 변경되었습니다.", { theme: "plain", zIndex: 9999 });
      navigate("/");
    } catch (error) {
      switch (error) {
        case "New password should be different from the old password.":
          toast("이전 비밀번호와 동일합니다.", { theme: "failure", zIndex: 9999 });
          break;
        case "Auth session missing!":
          toast("이메일 유효시간이 만료되었습니다.", { theme: "failure", zIndex: 9999 });
          break;
        default:
          toast("비밀번호 변경에 실패하였습니다.", { theme: "failure", zIndex: 9999 });
          console.error("newError : ", error);
          break;
      }
    }
  };

  return (
    <section className="items-center flex-column mt-20 max-w-[480px] w-[90%] mx-auto">
      <div className="w-full text-center underline-pb">
        <p className="mt-10 title-3">새로운 비밀번호</p>
      </div>
      <div className="w-full mt-10 body-3">
        <div className="items-center flex-column">
          <p>비밀번호 재설정을 위한 본인 확인이 완료되었습니다.</p>
          <p>새로운 비밀번호를 등록 후 사용해주세요.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="#" className="w-full mt-10 flex-column">
          <label htmlFor="newPassword" className="self-start body-4 my-[8px]">
            새 비밀번호
          </label>
          <div className="flex w-full">
            <input
              id="newPassword"
              type="password"
              placeholder="새 비밀번호"
              className="auth-input body-3"
              {...register("newPassword", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
                },
                minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
                validate: {
                  matchesPreviousPassword: (value) => {
                    const prevPassword = getValues("newPasswordConfirm");
                    return prevPassword === value || "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
            />
          </div>
          <InvalidText errorsMessage={errors.newPassword?.message} />

          <label htmlFor="newPasswordConfirm" className="self-start my-2 body-4">
            새 비밀번호 확인
          </label>
          <div className="flex w-full">
            <input
              id="newPasswordConfirm"
              type="password"
              placeholder="새 비밀번호 확인"
              className="auth-input body-3"
              {...register("newPasswordConfirm", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
          </div>
          <InvalidText errorsMessage={errors.newPasswordConfirm?.message} />
          <button className="auth-button point-button">변경하기</button>
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
