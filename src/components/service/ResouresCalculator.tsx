import React, { useState, useCallback } from "react";

import CloseBtn from "assets/svgs/close.svg";
import tileIMG from "assets/svgs/tileCalculator.svg";
import wallPaperIMG from "assets/svgs/wallpaperCalculator.svg";
import { type ResultCalculator, type WidthHeight } from "types/calculator";

import CalculatorArticle from "./CalculatorArticle";
import CalculatorResult from "./CalculatorResult";
import { RESOURES_CALCULATOR_LIST } from "./data";

const IMG_LIST: string[] = [wallPaperIMG, tileIMG];

export const ResouresCalculator = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<number>(0);

  const [resoures, setResoures] = useState<WidthHeight>({
    width: "",
    height: "",
  });
  const [workingArea, setWorkingArea] = useState<WidthHeight>({
    width: "",
    height: "",
  });
  const [result, setResult] = useState<ResultCalculator>({
    resultArea: "",
    result_consumption: "",
  });

  const onSubmitResouresCalculator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resoures.width === "" || resoures.height === "") return;
    if (workingArea.width === "" || workingArea.height === "") return;
    setVisible(true);
    handleCalculrator();
  };

  const handleCalculrator = useCallback(() => {
    const RESULT_AREA: number = +((+workingArea.width / 100) * (+workingArea.height / 100));
    let RESULT_CONSUMPTION: number = 0;
    if (selectItem === 0)
      RESULT_CONSUMPTION = Math.ceil(
        +RESULT_AREA / (+resoures.width * +resoures.height) + +RESULT_AREA / (+resoures.width * +resoures.height) / 10,
      );

    if (selectItem === 1)
      RESULT_CONSUMPTION = Math.ceil(
        (+RESULT_AREA * 10000) / (+resoures.width * +resoures.height) +
          (+RESULT_AREA * 10000) / (+resoures.width * +resoures.height) / 10,
      );

    setResult({
      resultArea: `${RESULT_AREA}`,
      result_consumption: `${RESULT_CONSUMPTION}`,
    });
  }, [workingArea, resoures]);

  const onVisibleBtn = useCallback(() => {
    setVisible(false);
    setResult({
      resultArea: "",
      result_consumption: "",
    });
  }, []);

  const onSelectItem = useCallback((index: number) => {
    setSelectItem(index);
    setResoures({
      width: "",
      height: "",
    });
    setWorkingArea({
      width: "",
      height: "",
    });
  }, []);

  const handleTapClick = (index: number) => {
    onSelectItem(index);
    setVisible(false);
    setWorkingArea({
      width: "",
      height: "",
    });
  };
  return (
    <>
      <div>
        {/* 계산기 헤더 */}
        <div className="mb-10">
          <ul className="flex items-center justify-between">
            {RESOURES_CALCULATOR_LIST.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    handleTapClick(index);
                  }}
                  key={item}
                  className={`flex contents-center w-full px-6 py-3 mr-4 border rounded-lg cursor-pointer ${
                    selectItem === index ? "border-black" : "border-gray05 opacity-40"
                  } last:mr-0 `}
                >
                  <img
                    className={`mr-1 ${selectItem === index ? "" : "opacity-40"}`}
                    src={IMG_LIST[index]}
                    alt={`${item} 아이콘`}
                  />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 계산기 바디 */}
        <form className="mb-10" onSubmit={onSubmitResouresCalculator}>
          <CalculatorArticle
            state={resoures}
            setState={setResoures}
            propId="resoures"
            label="자재 사이즈"
            firstPlaceholder="폭"
            secondPlaceholder="길이"
            selectItem={selectItem}
          />
          <CalculatorArticle
            state={workingArea}
            setState={setWorkingArea}
            propId="workingrea"
            label="작업 면적"
            firstPlaceholder="너비"
            secondPlaceholder="높이"
          />
          <button className="w-full rounded-xl bg-yellow-300 h-[51px]">계산하기</button>
        </form>

        {/* 결과값 */}
        {visible && (
          <section>
            {/* 결과값 헤더 */}
            <div className="flex items-center justify-between pb-6 mb-10 border-b border-b-black">
              <h2 className="text-[18px]">예상 소모량</h2>
              <button className="w-[18px] h-[18px]" onClick={onVisibleBtn}>
                <img className="block w-[18px] h-[18px]" src={CloseBtn} alt="엑스모양 사진" />
              </button>
            </div>

            {/* 결과값 바디 */}
            <div className="mb-6">
              <div className="mb-3">
                <CalculatorResult result={result.resultArea} resultName="작업 면적" />
              </div>
              <CalculatorResult result={result.result_consumption} resultName="소모량" meter={true} />
            </div>
            <p className="text-gray">- 소모량은 예상 수치로 약간의 차이가 날 수 있습니다.</p>
          </section>
        )}
      </div>
    </>
  );
};
