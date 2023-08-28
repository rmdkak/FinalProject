import { type Dispatch, type SetStateAction } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export interface PasswordVisible {
  password: boolean;
  passwordConfirm?: boolean;
}

interface Props {
  passwordType: "password" | "passwordConfirm";
  isVisibleState: PasswordVisible;
  setIsVisibleState: Dispatch<SetStateAction<PasswordVisible>>;
}

export const PasswordVisibleButton = ({ passwordType, isVisibleState, setIsVisibleState }: Props) => {
  return (
    <>
      {isVisibleState[passwordType] ?? false ? (
        <AiOutlineEyeInvisible
          className="h-[16px] absolute right-[24px] top-[50%] translate-y-[-50%] text-[25px] text-gray04 cursor-pointer"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: false });
          }}
        />
      ) : (
        <AiOutlineEye
          className="h-[16px] absolute right-[24px] top-[50%] translate-y-[-50%] text-[25px] text-gray04 cursor-pointer"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: true });
          }}
        />
      )}
    </>
  );
};
