import checkboxtrue from "assets/svgs/checkboxtrue.svg";
import ckeckboxfalse from "assets/svgs/ckeckboxfalse.svg";

interface Props {
  isCheck: boolean;
  size?: number;
}

export const CheckBoxIcon = ({ isCheck, size = 20 }: Props) => {
  return (
    <>
      {isCheck ? (
        <img src={checkboxtrue} className={`w-[${size}px] h-[${size}px] text-black cursor-pointer`} />
      ) : (
        <img src={ckeckboxfalse} className={`w-[${size}px] h-[${size}px] text-gray05 cursor-pointer`} />
      )}
    </>
  );
};
