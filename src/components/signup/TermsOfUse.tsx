import { useState } from "react";

import { CheckBoxIcon, ArrowButton, Title } from "components";

import { TERMS_1, TERMS_2 } from "./constant";
import { SignupStep } from "./SignupStep";

interface Props {
  nextStep: () => void;
}

const TEXTAREA_STYLE =
  "w-full h-[300px] sm:h-[160px] p-6 mt-2.5 bg-white border border-gray05 text-gray03 rounded-[4px] resize-none focus:outline-none";

/**
 * 이용약관 컴포넌트
 */
export const TermsOfUse = ({ nextStep }: Props) => {
  const initialValue = { terms1: false, terms2: false };

  const [termsToggleIsOpen, setTermsToggleIsOpen] = useState(initialValue);
  const [termsInputIsCheck, setTermsInputIsCheck] = useState(initialValue);

  const termsOpenHandler = (target: "terms1" | "terms2") => {
    setTermsToggleIsOpen({ ...termsToggleIsOpen, [target]: !termsToggleIsOpen[target] });
  };

  return (
    <div className="items-center max-w-[560px] mx-auto flex-column my-14 sm:my-6">
      <Title title="회원가입" isBorder={true} pathName="signup" />
      <SignupStep step={0} />
      <ul className="w-[85%]">
        <li className="flex items-center w-full pt-4 border-b border-black pb-7">
          <input
            onChange={(event) => {
              setTermsInputIsCheck({ terms1: event.target.checked, terms2: event.target.checked });
            }}
            className="hidden"
            checked={termsInputIsCheck.terms1 && termsInputIsCheck.terms2}
            id="allCheck"
            type="checkbox"
          />
          <label htmlFor="allCheck" className="flex gap-3 cursor-pointer contents-center body-3">
            <CheckBoxIcon type="black" isCheck={termsInputIsCheck.terms1 && termsInputIsCheck.terms2} />
            전체 동의
          </label>
        </li>
        <li className="relative w-full py-6">
          <div className="flex items-center justify-between w-full">
            <input
              onChange={(event) => {
                setTermsInputIsCheck({ ...termsInputIsCheck, terms1: event.target.checked });
              }}
              className="hidden"
              id="terms1"
              name="terms1"
              type="checkbox"
            />
            <label htmlFor="terms1" className="flex gap-3 cursor-pointer contents-center body-3">
              <CheckBoxIcon type="black" isCheck={termsInputIsCheck.terms1} />
              [필수] <span className="text-gray02">이용약관 동의</span>
            </label>
            <ArrowButton
              isOpen={termsToggleIsOpen.terms1}
              openHandler={termsOpenHandler}
              statusToClose={"terms1"}
              statusToOpen={"terms1"}
              className="flex w-4 h-4 cursor-pointer contents-center"
            />
          </div>
          {termsToggleIsOpen.terms1 && <textarea className={TEXTAREA_STYLE} value={TERMS_1} disabled />}
        </li>
        <li className="relative w-full py-4">
          <div className="flex items-center justify-between w-full">
            <input
              onChange={(event) => {
                setTermsInputIsCheck({ ...termsInputIsCheck, terms2: event.target.checked });
              }}
              className="hidden"
              id="terms2"
              name="terms2"
              type="checkbox"
            />
            <label htmlFor="terms2" className="flex gap-3 cursor-pointer contents-center body-3">
              <CheckBoxIcon type="black" isCheck={termsInputIsCheck.terms2} />
              [필수] <span className="text-gray02">개인정보 수집 및 이용 동의</span>
            </label>
            <ArrowButton
              isOpen={termsToggleIsOpen.terms2}
              openHandler={termsOpenHandler}
              statusToClose={"terms2"}
              statusToOpen={"terms2"}
              className="flex w-4 h-4 cursor-pointer contents-center"
            />
          </div>
          {termsToggleIsOpen.terms2 && <textarea className={TEXTAREA_STYLE} value={TERMS_2} disabled />}
        </li>
        <button
          disabled={!termsInputIsCheck.terms1 || !termsInputIsCheck.terms2}
          className="mt-6 text-black auth-button auth-button-text point-button"
          onClick={nextStep}
        >
          약관 동의
        </button>
      </ul>
    </div>
  );
};
