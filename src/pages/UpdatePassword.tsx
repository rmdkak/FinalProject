import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { changePassword } from "api/supabase";
import { InvalidText } from "components/signup/InvalidText";

interface UpdatePasswordInput {
  newPassword: string;
  newPasswordConfirm: string;
}

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdatePasswordInput>();

  const onSubmit: SubmitHandler<UpdatePasswordInput> = async (data) => {
    const { newPassword } = data;
    await changePassword(newPassword).then(() => {
      alert("비밀번호가 정상적으로 변경되었습니다.");
      navigate("/");
    });
  };

  return (
    <section className="flex flex-col mt-[71px] text-center">
      <h2 className="text-[32px] font-[700]">비밀번호 재설정</h2>
      <div className="w-[480px] mx-auto mt-[40px] text-[14px] font-[400]">
        <div className="">
          <p>비밀번호 재설정을 위한 본인 확인이 완료되었습니다.</p>
          <p>새로운 비밀번호를 등록 후 사용해주세요.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="#" className="mt-[40px] flex flex-col gap-[24px]">
          <div className="flex items-center gap-[16px] px-[24px] bg-[#F9F9F9] w-full h-[48px] justify-between ">
            <label className="w-[100px] text-left" htmlFor="email">
              이메일
            </label>
            <input id="email" type="email" disabled placeholder="이메일" className="w-[325px] h-full" />
          </div>
          <div className="flex items-center gap-[16px] px-[24px] w-full h-[48px] justify-between border border-[#888] ">
            <label className="w-[100px] text-left text-[#888]" htmlFor="newPassword">
              새 비밀번호
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="새 비밀번호"
              {...register("newPassword", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
                },
                minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
              })}
              className="w-[325px] h-full"
            />
            <InvalidText errorsMessage={errors.newPassword?.message} />
          </div>
          <div className="flex items-center gap-[16px] px-[24px] w-full h-[48px] justify-between border border-[#888] ">
            <label className="w-[100px] text-left text-[#888]" htmlFor="newPasswordConfirm">
              새 비밀번호 확인
            </label>
            <input
              id="newPasswordConfirm"
              type="password"
              placeholder="새 비밀번호 확인"
              {...register("newPasswordConfirm", {
                required: "비밀번호를 입력해주세요.",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const prevPassword = getValues("newPassword");
                    return prevPassword === value || "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
              className="w-[325px] h-full"
            />
            <InvalidText errorsMessage={errors.newPasswordConfirm?.message} />
          </div>
          <button className="w-full text-[#fff] py-3 bg-[#888]">변경하기</button>
        </form>
      </div>
    </section>
  );
};
