import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { findPassword } from "api/supabase";

interface FindPasswordInput {
  email: string;
}

export const FindPassword = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FindPasswordInput>();

  const onSubmit: SubmitHandler<FindPasswordInput> = async (data) => {
    const { email } = data;
    await findPassword(email);
    alert("이메일이 전송되었습니다.");
    navigate("/");
  };

  return (
    <>
      <section className="flex flex-col text-center mt-[71px]">
        <h2 className="text-[32px] font-[700]">비밀번호 찾기</h2>

        <div className="w-[480px] mx-auto mt-[40px] text-[14px] font-[400]">
          <form onSubmit={handleSubmit(onSubmit)} action="#" className="mt-[40px] flex flex-col gap-[24px]">
            <div className="flex items-center gap-[16px] px-[24px] w-full h-[48px] justify-between border border-[#888] ">
              <label className="w-[100px] text-left text-[#888]" htmlFor="findPasswordEmail">
                이메일
              </label>
              <input
                id="findPasswordEmail"
                type="text"
                placeholder="이메일"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  minLength: { value: 10, message: "이메일이 너무 짧습니다." },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "이메일 형식이 올바르지 않습니다.",
                  },
                })}
                className="w-[325px] h-full"
              />
            </div>
            <button className="mt-6 w-full text-[#fff] py-3 bg-[#888]">이메일 전송</button>
          </form>
        </div>
      </section>
    </>
  );
};
