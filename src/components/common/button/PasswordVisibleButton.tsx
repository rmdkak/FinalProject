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
          className="absolute h-4 text-2xl -translate-y-1/2 cursor-pointer right-6 top-1/2 text-gray04"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: false });
          }}
        />
      ) : (
        <AiOutlineEye
          className="absolute h-4 text-2xl -translate-y-1/2 cursor-pointer right-6 top-1/2 text-gray04"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: true });
          }}
        />
      )}
    </>
  );
};
