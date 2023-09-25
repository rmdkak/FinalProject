import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { yupResolver } from "@hookform/resolvers/yup";
import { findPassword, sendEmailForFindPassword } from "api/supabase/auth";
import { InvalidText, Select, idQuestionOptions } from "components";
import { findPasswordSchema } from "schema/formSchema";

interface Input {
  emailForPassword: string;
  nicknameForPassword: string;
  idAnswerForPassword: string;
}

export const FindPassword = () => {
  const navigate = useNavigate();

  const [selectIdQuestion, setSelectIdQuestion] = useState<string | undefined>();

  const resolver = yupResolver(findPasswordSchema);
  const { register, handleSubmit, reset, setError, formState } = useForm<Input>({ resolver });
  const { errors } = formState;

  const findPasswordHandler: SubmitHandler<Input> = async (data) => {
    const { emailForPassword: email, nicknameForPassword: name, idAnswerForPassword: idAnswer } = data;

    if (selectIdQuestion === undefined) {
      setError("idAnswerForPassword", { message: "본인확인 질문을 선택해주세요" });
      return;
    }

    try {
      const data = await findPassword({ name, email, idAnswer, idQuestion: selectIdQuestion });
      await sendEmailForFindPassword(data.email);
      toast("이메일이 전송되었습니다.", { theme: "warning", zIndex: 9999 });
      navigate("/");
    } catch (error) {
      setError("root", { message: "해당 유저를 찾을 수 없습니다." });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(findPasswordHandler)} className="w-full gap-4 flex-column contents-center sm:gap-0">
      <div className="w-full gap-2 flex-column">
        <label htmlFor="email">이메일</label>
        <input
          {...register("emailForPassword")}
          className="auth-input body-3"
          placeholder="이메일을 입력해주세요."
          id="email"
        />
      </div>
      <InvalidText errorsMessage={errors.emailForPassword?.message} />

      <div className="w-full gap-2 flex-column sm:mt-1">
        <label htmlFor="nicknameForPassword">닉네임</label>
        <input
          {...register("nicknameForPassword")}
          className="auth-input body-3"
          placeholder="닉네임을 입력해주세요."
          id="nicknameForPassword"
        />
      </div>
      <InvalidText errorsMessage={errors.nicknameForPassword?.message} />

      <div className="w-full gap-2 flex-column sm:mt-1">
        <label htmlFor="idAnswerForPassword">본인확인질문</label>
        <Select
          placeholder={"본인확인 질문을 선택해주세요."}
          option={idQuestionOptions}
          selectedValue={selectIdQuestion}
          setSelectedValue={setSelectIdQuestion}
          selfEnterOption={false}
        />
        <input
          {...register("idAnswerForPassword")}
          className="auth-input body-3"
          placeholder="본인확인 질문에 답변해주세요."
          id="idAnswerForPassword"
        />
      </div>
      <InvalidText errorsMessage={errors.idAnswerForPassword?.message} />

      <button className="text-center auth-button body-3 point-button">이메일 인증 받기</button>
      <div className="text-gray03 body-4">
        <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
        <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
      </div>
    </form>
  );
};
