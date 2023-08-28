// TODO: 자재 소모량 계산기

import React, { useState } from "react";

import CloseBtn from "assets/close.svg";
import tileIMG from "assets/tileCalculator.svg";
import wallPaperIMG from "assets/wallpaperCalculator.svg";

import CalculatorArticle from "./CalculatorArticle";
import CalculatorResult from "./CalculatorResult";

export const ResouresCalculator = (): JSX.Element => {
  const [close, setClose] = useState<boolean>(false);
  const onSubmitResouresCalculator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onCalculatorBtn = () => {
    console.log(1);
    setClose(true);
  };
  const onCloseBtn = () => {
    setClose(false);
  };

  return (
    <>
      <div>
        {/* 계산기 헤더 */}
        <div className="mb-10">
          <ul className="flex items-center justify-between">
            <li className="text-gray01 border  border-[#000] rounded-lg flex items-center justify-center w-full px-6 py-3 mr-4 ">
              <img className="mr-1" src={wallPaperIMG} alt="벽지 모양 이모티콘" />
              벽지
            </li>
            <li className="text-gray01 border  border-[#000] rounded-lg flex items-center justify-center w-full px-6 py-3 ">
              <img className="mr-1" src={tileIMG} alt="타일 모양 이모티콘" />
              타일
            </li>
          </ul>
        </div>

        {/* 계산기 바디 */}
        <form className="mb-10" onSubmit={onSubmitResouresCalculator}>
          <CalculatorArticle propId="resoures" label="자재 사이즈" firstPlaceholder="폭" secondPlaceholder="길이" />
          <CalculatorArticle propId="workingrea" label="작업 면적" firstPlaceholder="너비" secondPlaceholder="높이" />
          <button onClick={onCalculatorBtn} className="w-full rounded-xl bg-yellow-300 h-[51px]">
            계산하기
          </button>
        </form>

        {/* 결과값 */}
        {close && (
          <section>
            {/* 결과값 헤더 */}
            <div className="flex items-center justify-between pb-6 mb-10 border border-b-[#000]">
              <h2 className="text-[18px]">예상 소모량</h2>
              <button className="w-[18px] h-[18px]" onClick={onCloseBtn}>
                <img className="block w-[18px] h-[18px]" src={CloseBtn} alt="엑스모양 사진" />
              </button>
            </div>

            {/* 결과값 바디 */}
            <div className="mb-6">
              <div className="mb-3">
                <CalculatorResult resultName="작업 면적" />
              </div>
              <CalculatorResult resultName="소모량" />
            </div>
            <p className="text-gray">- 소모량은 예상 수치로 약간의 차이가 날 수 있습니다.</p>
            {/*  */}
          </section>
        )}
      </div>
    </>
  );
};
