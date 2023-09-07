import React, { useState, useCallback } from "react";

import CloseBtn from "assets/svgs/close.svg";
import tileIMG from "assets/svgs/tileCalculator.svg";
import wallPaperIMG from "assets/svgs/wallpaperCalculator.svg";
import { type ResultCalculator, type WidthHeight } from "types/calculator";
import { resultConsumpTionCalculate, workingAreaCalculator } from "utils/ResourcesCalculator";

import { CalculatorArticle } from "./CalculatorArticle";
import { CalculatorResult } from "./CalculatorResult";
import { RESOURCES_CALCULATOR_LIST } from "./data";

const IMG_LIST: string[] = [wallPaperIMG, tileIMG];

export const ResourcesCalculatorMamoization = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<number>(0);

  const [resources, setResources] = useState<WidthHeight>({
    width: "",
    height: "",
  });
  const [workingArea, setWorkingArea] = useState<WidthHeight>({
    width: "",
    height: "",
  });
  const [result, setResult] = useState<ResultCalculator>({
    resultArea: "",
    resultConsumption: "",
  });

  const resetState = useCallback(() => {
    setResult({
      resultArea: "",
      resultConsumption: "",
    });
    setResources({
      width: "",
      height: "",
    });
    setWorkingArea({
      width: "",
      height: "",
    });
  }, []);

  const onSubmitResourcesCalculator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resources.width === "" || resources.height === "") return;
    if (workingArea.width === "" || workingArea.height === "") return;
    setVisible(true);
    handleCalculrator();
  };

  const handleCalculrator = useCallback(() => {
    const resultArea = workingAreaCalculator(+workingArea.width, +workingArea.height);

    const resultConsumpTion: number | undefined = resultConsumpTionCalculate(
      resultArea,
      +resources.width,
      +resources.height,
      selectItem,
    );
    if (typeof resultConsumpTion === "number") {
      setResult({
        resultArea: `${resultArea}`,
        resultConsumption: `${resultConsumpTion}`,
      });
    }
  }, [workingArea, resources]);

  const onVisibleBtn = useCallback(() => {
    setVisible(false);
    resetState();
  }, []);

  const onSelectItem = useCallback((index: number) => {
    setSelectItem(index);
    resetState();
  }, []);

  const handleTapClick = (index: number) => {
    onSelectItem(index);
    setVisible(false);
    resetState();
  };

  return (
    <>
      <div>
        {/* 계산기 헤더 */}
        <div className="mb-10">
          <ul className="flex items-center justify-between">
            {RESOURCES_CALCULATOR_LIST.map((item, index) => {
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
        <form className="mb-10" onSubmit={onSubmitResourcesCalculator}>
          <CalculatorArticle
            state={resources}
            setState={setResources}
            label="자재 사이즈"
            firstPlaceholder="폭"
            secondPlaceholder="길이"
            selectItem={selectItem}
          />
          <CalculatorArticle
            state={workingArea}
            setState={setWorkingArea}
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
                <img width={18} height={18} className="block" src={CloseBtn} alt="엑스모양 사진" />
              </button>
            </div>

            {/* 결과값 바디 */}
            <div className="mb-6">
              <div className="mb-3">
                <CalculatorResult result={result.resultArea} resultName="작업 면적" />
              </div>
              <CalculatorResult result={result.resultConsumption} resultName="소모량" meter={true} />
            </div>
            <p className="text-gray">- 소모량은 예상 수치로 약간의 차이가 날 수 있습니다.</p>
          </section>
        )}
      </div>
    </>
  );
};

export const ResourcesCalculator = React.memo(ResourcesCalculatorMamoization);
