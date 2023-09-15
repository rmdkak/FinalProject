import checkboxtrue from "assets/svgs/checkboxtrue.svg";
import ckeckboxfalse from "assets/svgs/ckeckboxfalse.svg";
import pointCheck from "assets/svgs/pointCheck.svg";
import pointChecked from "assets/svgs/pointChecked.svg";

interface Props {
  isCheck: boolean;
  type: "pointColor" | "black";
}

export const CheckBoxIcon = ({ isCheck, type }: Props) => {
  if (type === "pointColor") {
    return (
      <>
        {isCheck ? (
          <img src={pointChecked} alt="체크완료" className="w-5 h-5 text-black cursor-pointer" />
        ) : (
          <img src={pointCheck} alt="체크안됨" className="w-5 h-5 cursor-pointer text-gray05" />
        )}
      </>
    );
  }

  return (
    <>
      {isCheck ? (
        <img src={checkboxtrue} alt="체크완료" className="w-5 h-5 text-black cursor-pointer" />
      ) : (
        <img src={ckeckboxfalse} alt="체크안됨" className="w-5 h-5 cursor-pointer text-gray05" />
      )}
    </>
  );
};
