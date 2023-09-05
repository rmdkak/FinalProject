interface Props {
  step: 0 | 1 | 2;
}

const CIRCLE_STYLE =
  "flex contents-center w-[24px] h-[24px] rounded-full text-center text-[12px] font-medium leading-[130%]";
const FOCUS_STYLE = "bg-point text-black";
const NOT_FOCUS_STYLE = "bg-gray05 text-white";

export const SignupStep = ({ step }: Props) => {
  return (
    <div className="flex my-[40px] gap-[24px]">
      <div className="contents-center flex-column gap-[12px]">
        <div className={`${CIRCLE_STYLE} ${step === 0 ? FOCUS_STYLE : NOT_FOCUS_STYLE}`}>1</div>
        <p className="body-3">약관동의</p>
      </div>
      <div className="contents-center flex-column gap-[12px]">
        <div className={`${CIRCLE_STYLE} ${step === 1 ? FOCUS_STYLE : NOT_FOCUS_STYLE}`}>2</div>
        <p className="body-3">정보입력</p>
      </div>
      <div className="contents-center flex-column gap-[12px]">
        <div className={`${CIRCLE_STYLE} ${step === 2 ? FOCUS_STYLE : NOT_FOCUS_STYLE}`}>3</div>
        <p className="body-3">가입완료</p>
      </div>
    </div>
  );
};
