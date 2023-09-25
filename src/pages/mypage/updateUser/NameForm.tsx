import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

import { yupResolver } from "@hookform/resolvers/yup";
import { changeMetaName, fetchUserCheckData } from "api/supabase/auth";
import { InvalidText } from "components";
import { useAuthQuery } from "hooks/useAuthQuery";
import Error from "pages/Error";
import { updateUserNameSchema } from "schema/formSchema";
import { useAuthStore } from "store";

import { LABEL_STYLE } from "./UpdateUser";

interface Input {
  name: string;
}

interface Props {
  toggleChangeHandler: (target: "name" | "password") => void;
  isOpen: boolean;
}

export const NameForm = ({ toggleChangeHandler, isOpen }: Props) => {
  const navigate = useNavigate();

  const [checkedDuplicate, setCheckedDuplicate] = useState(false);

  const resolver = yupResolver(updateUserNameSchema);
  const { register, handleSubmit, getValues, setError, reset, formState } = useForm<Input>({ resolver });
  const { errors } = formState;

  const { currentUserResponse, patchUserMutation } = useAuthQuery();
  const { data: currentUser } = currentUserResponse;
  const { currentUserId } = useAuthStore();

  if (currentUser === undefined || currentUserId === undefined) {
    navigate("/");
    return <Error />;
  }

  const { name: currentName } = currentUser;
  const userId = currentUserId;

  const duplicateCheck = async () => {
    const getUserData = await fetchUserCheckData();

    const matchUser = getUserData.filter((user) => user.name === getValues("name"));

    if (matchUser === null || matchUser.length === 0) setCheckedDuplicate(true);
    else setError("name", { message: "이미 존재하는 닉네임입니다." });
  };

  const changeNameHandler: SubmitHandler<Input> = async (data) => {
    const inputValue = { name: data.name };
    if (data.name !== currentName) {
      if (!checkedDuplicate) {
        setError("name", { message: "중복체크를 눌러주세요." });
        return;
      }

      await changeMetaName(data.name);
      patchUserMutation.mutate({ inputValue, userId });
    } else {
      toast("이전 닉네임과 동일합니다.", { theme: "failure", zIndex: 9999 });
    }

    reset();
    toggleChangeHandler("name");
  };

  return (
    <div className="gap-2 border-b pb-7 flex-column border-b-gray06 md:contents-center sm:contents-center sm:w-full">
      <div className="flex gap-6">
        <label htmlFor="nickname" className={LABEL_STYLE}>
          닉네임
        </label>
        <button
          id="nickname"
          type="button"
          onClick={() => {
            toggleChangeHandler("name");
          }}
          className="w-32 h-12 rounded-lg point-button body-3"
        >
          변경
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit(changeNameHandler)} className="flex-column">
          <div className="flex gap-6 w-[300px] mt-10 sm:flex-col sm:w-full">
            <input
              id={"name"}
              placeholder={"닉네임"}
              defaultValue={currentName}
              className="auth-input sm:w-full"
              {...register("name", {
                onChange: () => {
                  setCheckedDuplicate(false);
                },
              })}
            />
            <button
              type="button"
              onClick={duplicateCheck}
              className="w-32 h-12 rounded-lg gray-outline-button body-3 sm:w-full"
            >
              중복체크
            </button>
          </div>
          {checkedDuplicate ? (
            <p className={"h-10 w-full flex contents-center text-xs text-green-500 font-normal"}>
              사용 가능한 닉네임입니다.
            </p>
          ) : (
            <InvalidText className="justify-center" errorsMessage={errors.name?.message} size={40} />
          )}
          <div className="flex items-center justify-start gap-3 sm:justify-center">
            <button
              type="button"
              className="w-32 h-12 rounded-lg gray-outline-button body-3 sm:w-full"
              onClick={() => {
                toggleChangeHandler("name");
              }}
            >
              취소
            </button>
            <button className="w-32 h-12 rounded-lg point-button body-3 sm:w-full">수정</button>
          </div>
        </form>
      )}
    </div>
  );
};
