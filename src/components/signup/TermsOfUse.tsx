import { useState, type ChangeEvent } from "react";

import arrowIcon from "assets/arrowIcon.svg";
import { BUTTON_COMMON_STYLE } from "pages";

import { TERMS_1, TERMS_2 } from "./constant";

// 이용약관 컴포넌트
interface Props {
  nextStep: () => void;
}

const CHECKED_STYLE = `checked:bg-green-500 checked:text-white`;
const CHECK_TYPE_STYLE = `w-6 h-6 appearance-none bg-white border-[2px] border-[#1A1A1A] ${CHECKED_STYLE}`;
const TEXT_STYLE = "text-[14px] font-[400] leading-[130%] ml-[16px]";
const FLEX_CENTER = "flex items-center";
const FLEX_V_CENTER = `${FLEX_CENTER} flex-col`;
const TEXTAREA_STYLE = "w-full h-[300px] mt-[10px] resize-none focus:outline-none";

export const TermsOfUse = ({ nextStep }: Props) => {
  const initialValue = { terms1: false, terms2: false };

  const [termsToggleIsOpen, setTermsToggleIsOpen] = useState(initialValue);
  const [termsInputIsCheck, setTermsInputIsCheck] = useState(initialValue);

  const termsCheckHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsInputIsCheck({ ...termsInputIsCheck, [event.target.name]: event.target.checked });
  };

  return (
    <div className={`${FLEX_V_CENTER} mt-[40px]`}>
      <p className="text-[32px] font-[700] leading-[130%] mt-[40px]">회원가입</p>
      <ul className={`w-[480px]`}>
        <li className={`${FLEX_CENTER} border-b-[1px] border-[#1A1A1A] w-full py-[16px]`}>
          <input
            onChange={(event) => {
              setTermsInputIsCheck({ terms1: event.target.checked, terms2: event.target.checked });
            }}
            className={CHECK_TYPE_STYLE}
            checked={termsInputIsCheck.terms1 && termsInputIsCheck.terms2}
            id="allCheck"
            type="checkbox"
          />
          <label className={TEXT_STYLE} htmlFor="allCheck">
            전체 동의
          </label>
        </li>
        <li className={`relative w-full py-[16px]`}>
          <div className="flex items-center w-full">
            <input
              onChange={termsCheckHandler}
              name="terms1"
              checked={termsInputIsCheck.terms1}
              className={CHECK_TYPE_STYLE}
              type="checkbox"
            />
            <button
              onClick={() => {
                setTermsToggleIsOpen({ ...termsToggleIsOpen, terms1: !termsToggleIsOpen.terms1 });
              }}
              className="flex items-center justify-between w-full"
            >
              <p className={TEXT_STYLE}>
                [필수] <span className="text-[#888888]">이용약관 동의</span>
              </p>
              <img src={arrowIcon} />
            </button>
          </div>
          {termsToggleIsOpen.terms1 && <textarea className={TEXTAREA_STYLE} value={TERMS_1} disabled></textarea>}
        </li>
        <li className="relative flex flex-col items-center w-full py-[16px]">
          <div className="flex items-center w-full">
            <input
              onChange={termsCheckHandler}
              name="terms2"
              checked={termsInputIsCheck.terms2}
              className={CHECK_TYPE_STYLE}
              type="checkbox"
            />
            <button
              onClick={() => {
                setTermsToggleIsOpen({ ...termsToggleIsOpen, terms2: !termsToggleIsOpen.terms2 });
              }}
              className="flex items-center justify-between w-full"
            >
              <p className={TEXT_STYLE}>
                [필수] <span className="text-[#888888]">개인정보 수집 및 이용 동의</span>
              </p>
              <img src={arrowIcon} />
            </button>
          </div>
          {termsToggleIsOpen.terms2 && <textarea className={TEXTAREA_STYLE} value={TERMS_2} disabled></textarea>}
        </li>
        <button
          disabled={!termsInputIsCheck.terms1 || !termsInputIsCheck.terms2}
          className={BUTTON_COMMON_STYLE}
          onClick={nextStep}
        >
          약관 동의
        </button>
      </ul>
    </div>
  );
};
