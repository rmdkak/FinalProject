import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "api/supabase/auth";
import { InvalidText } from "components";
import { updateUserPasswordSchema } from "schema/formSchema";

interface UpdatePasswordInput {
  password: string;
  passwordConfirm: string;
}

const UpdatePassword = () => {
  const navigate = useNavigate();

  const resolver = yupResolver(updateUserPasswordSchema);
  const { register, handleSubmit, formState } = useForm<UpdatePasswordInput>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<UpdatePasswordInput> = async (data) => {
    const { password } = data;

    try {
      await changePassword(password);
      toast("비밀번호가 정상적으로 변경되었습니다.", { theme: "warning", zIndex: 9999 });
      navigate("/");
    } catch (error) {}
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
          <label htmlFor="password" className="self-start body-4 my-[8px]">
            새 비밀번호
          </label>
          <div className="flex w-full">
            <input
              id="password"
              type="password"
              placeholder="새 비밀번호"
              className="auth-input body-3"
              {...register("password")}
            />
          </div>
          <InvalidText errorsMessage={errors.password?.message} />

          <label htmlFor="passwordConfirm" className="self-start my-2 body-4">
            새 비밀번호 확인
          </label>
          <div className="flex w-full">
            <input
              id="passwordConfirm"
              type="password"
              placeholder="새 비밀번호 확인"
              className="auth-input body-3"
              {...register("passwordConfirm")}
            />
          </div>
          <InvalidText errorsMessage={errors.passwordConfirm?.message} />
          <button className="auth-button point-button">변경하기</button>
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
