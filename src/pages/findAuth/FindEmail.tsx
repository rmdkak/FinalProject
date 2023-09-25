import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { findEmail } from "api/supabase/auth";
import { InvalidText, Select, idQuestionOptions } from "components";
import { findEmailSchema } from "schema/formSchema";
import { type Tables } from "types/supabase";

interface Input {
  nicknameForEmail: string;
  idAnswerForEmail: string;
}

interface Props {
  failedFind: () => void;
  successFind: (data: Tables<"USERS", "Row">) => void;
}

export const FindEmail = ({ failedFind, successFind }: Props) => {
  const [selectIdQuestion, setSelectIdQuestion] = useState<string | undefined>();

  const resolver = yupResolver(findEmailSchema);
  const { register, handleSubmit, reset, setError, formState } = useForm<Input>({ resolver });
  const { errors } = formState;

  const findEmailHandler: SubmitHandler<Input> = async (data) => {
    const { nicknameForEmail: name, idAnswerForEmail: idAnswer } = data;

    if (selectIdQuestion === undefined) {
      setError("idAnswerForEmail", { message: "본인확인 질문을 선택해주세요" });
      return;
    }

    try {
      const data = await findEmail({ name, idAnswer, idQuestion: selectIdQuestion });
      successFind(data);
    } catch (error) {
      failedFind();
      setError("root", { message: "해당 유저를 찾을 수 없습니다." });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(findEmailHandler)} className="w-full gap-4 flex-column contents-center sm:gap-0">
      <div className="w-full gap-2 flex-column">
        <label htmlFor="nicknameForEmail">닉네임</label>
        <input
          id="nicknameForEmail"
          {...register("nicknameForEmail")}
          placeholder="닉네임을 입력해주세요."
          className="auth-input body-3"
        />
      </div>
      <InvalidText errorsMessage={errors.nicknameForEmail?.message} />

      <div className="w-full gap-2 flex-column sm:mt-1">
        <label htmlFor="idAnswerForEmail">본인확인질문</label>
        <Select
          placeholder={"본인확인 질문을 선택해주세요."}
          option={idQuestionOptions}
          selectedValue={selectIdQuestion}
          setSelectedValue={setSelectIdQuestion}
          selfEnterOption={false}
        />
        <input
          {...register("idAnswerForEmail")}
          id="idAnswerForEmail"
          placeholder="본인확인 질문에 답변해주세요."
          className="auth-input body-3"
        />
      </div>
      <InvalidText errorsMessage={errors.idAnswerForEmail?.message} />

      <button className="text-center auth-button body-3 point-button">아이디 찾기</button>
      <div className="text-gray03 body-4">
        <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
        <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
      </div>
    </form>
  );
};
