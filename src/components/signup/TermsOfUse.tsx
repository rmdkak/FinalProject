import { useState } from "react";

import arrowIcon from "assets/arrowIcon.svg";

import { TERMS_1, TERMS_2 } from "./constant";

// 이용약관 컴포넌트
interface Props {
  nextStep: () => void;
}

const checkBoxStyle =
  "w-6 h-6 appearance-none bg-white border-[2px] border-[#1A1A1A] checked:bg-green-500 checked:text-white checked:contents-[v]";

export const TermsOfUse = ({ nextStep }: Props) => {
  const [termsIsOpen, setTermsIsOpen] = useState({ terms1: false, terms2: false });

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <p className="text-[32px] font-[700] leading-[130%] mt-[40px]">회원가입</p>
      <ul className="flex flex-col items-start w-[480px]">
        <li className="flex items-center border-b-[1px] border-[#1A1A1A] w-full py-[16px]">
          <input className={checkBoxStyle} id="allCheck" type="checkbox" />
          <label className="text-[14px] font-[400] leading-[130%] ml-[16px]" htmlFor="allCheck">
            전체 동의
          </label>
        </li>
        <li className="relative flex flex-col items-center w-full py-[16px]">
          <div className="flex items-center w-full">
            <input className={checkBoxStyle} type="checkbox" />
            <button
              onClick={() => {
                setTermsIsOpen({ ...termsIsOpen, terms1: !termsIsOpen.terms1 });
              }}
              className="flex items-center justify-between w-full"
            >
              <p className="text-[14px] font-[400] leading-[130%] ml-[16px]">
                [필수] <span className="text-[#888888]">이용약관 동의</span>
              </p>
              <img src={arrowIcon} />
            </button>
          </div>
          {termsIsOpen.terms1 && (
            <textarea
              className="w-full h-[300px] mt-[10px] resize-none focus:outline-none"
              value={TERMS_1}
              disabled
            ></textarea>
          )}
        </li>
        <li className="relative flex flex-col items-center w-full py-[16px]">
          <div className="flex items-center w-full">
            <input className={checkBoxStyle} type="checkbox" />
            <button
              onClick={() => {
                setTermsIsOpen({ ...termsIsOpen, terms2: !termsIsOpen.terms2 });
              }}
              className="flex items-center justify-between w-full"
            >
              <p className="text-[14px] font-[400] leading-[130%] ml-[16px]">
                [필수] <span className="text-[#888888]">개인정보 수집 및 이용 동의</span>
              </p>
              <img src={arrowIcon} />
            </button>
          </div>
          {termsIsOpen.terms2 && (
            <textarea
              className="w-full h-[300px] mt-[10px] resize-none focus:outline-none"
              value={TERMS_2}
              disabled
            ></textarea>
          )}
        </li>
      </ul>
      <button className="w-[480px] h-[48px] text-white bg-[#888] mt-[24px]" onClick={nextStep}>
        약관 동의
      </button>
    </div>
  );
};
