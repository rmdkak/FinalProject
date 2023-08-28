import { FaRegSquareCheck } from "react-icons/fa6";

interface Props {
  checkState: boolean;
  changeCheckState: (boolean: boolean) => void;
  size: number;
}

export const CheckBoxIcon = ({ checkState, changeCheckState, size }: Props) => {
  return (
    <>
      {checkState ? (
        <FaRegSquareCheck
          className={`w-[${size}px] h-[${size}px] text-black`}
          onClick={() => {
            changeCheckState(!checkState);
          }}
        />
      ) : (
        <FaRegSquareCheck
          className={`w-[${size}px] h-[${size}px] text-gray05`}
          onClick={() => {
            changeCheckState(!checkState);
          }}
        />
      )}
    </>
  );
};
