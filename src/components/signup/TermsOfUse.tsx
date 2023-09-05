import { useState, type ChangeEvent } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";

import arrowIcon from "assets/arrowIcon.svg";

import { TERMS_1, TERMS_2 } from "./constant";
import { SignupStep } from "./SignupStep";

// 이용약관 컴포넌트
interface Props {
  nextStep: () => void;
}

const FLEX_CENTER = "flex items-center";
const TEXTAREA_STYLE =
  "w-full h-[300px] p-[24px] mt-[10px] bg-white border border-gray05 text-gray03 rounded-[4px] resize-none focus:outline-none";

export const TermsOfUse = ({ nextStep }: Props) => {
  const initialValue = { terms1: false, terms2: false };

  const [termsToggleIsOpen, setTermsToggleIsOpen] = useState(initialValue);
  const [termsInputIsCheck, setTermsInputIsCheck] = useState(initialValue);

  const termsCheckHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsInputIsCheck({ ...termsInputIsCheck, [event.target.name]: !event.target.checked });
  };

  const termsOpenHandler = (target: "terms1" | "terms2") => {
    setTermsToggleIsOpen({ ...termsToggleIsOpen, [target]: !termsToggleIsOpen[target] });
  };

  return (
    <div className="items-center flex-column my-20 w-[560px] mx-auto">
      <div className="w-full text-center underline-pb">
        <p className="title-3 mt-[40px]">회원가입</p>
      </div>
      <SignupStep step={0} />
      <ul className={`w-[480px]`}>
        <li className={`${FLEX_CENTER} border-b border-black w-full pb-[28px] pt-[16px]`}>
          <input
            onChange={(event) => {
              setTermsInputIsCheck({ terms1: event.target.checked, terms2: event.target.checked });
            }}
            className="hidden"
            checked={termsInputIsCheck.terms1 && termsInputIsCheck.terms2}
            id="allCheck"
            type="checkbox"
          />
          <label htmlFor="allCheck" className="flex contents-center body-3">
            {termsInputIsCheck.terms1 && termsInputIsCheck.terms2 ? (
              <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-black" />
            ) : (
              <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-gray05" />
            )}
            전체 동의
          </label>
        </li>
        <li className={`relative w-full py-[16px]`}>
          <div className="flex items-center justify-between w-full">
            <input onChange={termsCheckHandler} className="hidden" id="terms1" name="terms1" type="checkbox" />
            <label htmlFor="terms1" className="flex contents-center body-3">
              {termsInputIsCheck.terms1 ? (
                <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-black" />
              ) : (
                <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-gray05" />
              )}
              [필수] <span className="text-gray02 ml-[4px]">이용약관 동의</span>
            </label>
            <img
              src={arrowIcon}
              className="cursor-pointer"
              onClick={() => {
                termsOpenHandler("terms1");
              }}
            />
          </div>
          {termsToggleIsOpen.terms1 && <textarea className={TEXTAREA_STYLE} value={TERMS_1} disabled />}
        </li>
        <li className={`relative w-full py-[16px]`}>
          <div className="flex items-center justify-between w-full">
            <input onChange={termsCheckHandler} className="hidden" id="terms2" name="terms2" type="checkbox" />
            <label htmlFor="terms2" className="flex contents-center body-3">
              {termsInputIsCheck.terms2 ? (
                <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-black" />
              ) : (
                <FaRegSquareCheck className="w-[24px] h-[24px] mr-[12px] text-gray05" />
              )}
              [필수] <span className="text-gray02 ml-[4px]">개인정보 수집 및 이용 동의</span>
            </label>
            <img
              src={arrowIcon}
              className="cursor-pointer"
              onClick={() => {
                termsOpenHandler("terms2");
              }}
            />
          </div>
          {termsToggleIsOpen.terms2 && <textarea className={TEXTAREA_STYLE} value={TERMS_2} disabled />}
        </li>
        <button
          disabled={!termsInputIsCheck.terms1 || !termsInputIsCheck.terms2}
          // className="w-full h-[48px] text-black rounded-[8px] bg-point mt-[24px] disabled:bg-[#FFF5D7] text-[14px] font-medium leading-[130%]"
          className="auth-button auth-button-text text-black mt-[24px] point-button"
          onClick={nextStep}
        >
          약관 동의
        </button>
      </ul>
    </div>
  );
};
