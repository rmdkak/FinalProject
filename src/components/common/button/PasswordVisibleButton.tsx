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
    <button type="button" className="absolute -translate-y-1/2 right-6 top-1/2">
      {isVisibleState[passwordType] ?? false ? (
        <AiOutlineEyeInvisible
          className="h-4 text-gray04"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: false });
          }}
        />
      ) : (
        <AiOutlineEye
          className="h-4 text-gray04"
          onClick={() => {
            setIsVisibleState({ ...isVisibleState, [passwordType]: true });
          }}
        />
      )}
    </button>
  );
};
