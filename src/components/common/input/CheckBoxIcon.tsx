import checkboxtrue from "assets/svgs/checkboxtrue.svg";
import ckeckboxfalse from "assets/svgs/ckeckboxfalse.svg";

interface Props {
  checkState: boolean;
  size?: number;
}

export const CheckBoxIcon = ({ checkState, size = 20 }: Props) => {
  return (
    <>
      {checkState ? (
        <img src={checkboxtrue} className={`w-[${size}px] h-[${size}px] text-black cursor-pointer`} />
      ) : (
        <img src={ckeckboxfalse} className={`w-[${size}px] h-[${size}px] text-gray05 cursor-pointer`} />
      )}
    </>
  );
};
