import React, { useState, useCallback } from "react";

import CloseBtn from "assets/close.svg";
import tileIMG from "assets/tileCalculator.svg";
import wallPaperIMG from "assets/wallpaperCalculator.svg";
import { type ResultCalculator, type WidthHeight } from "types/calculator";

import CalculatorArticle from "./CalculatorArticle";
import CalculatorResult from "./CalculatorResult";
import { ResouresCalculatorList } from "./data";

const IMG_LIST: string[] = [wallPaperIMG, tileIMG];

export const ResouresCalculator = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
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
  const [selectItem, setSelectItem] = useState<number>(0);

  /**
   * 폼 서브밋 시 작동하는 이벤트입니다.
   * e.preventDefault();
   * setVisible(true); 예산 소모량 visible 컨트롤러
   * handleCalculrator();  계산 함수
   */
  const onSubmitResouresCalculator = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisible(true);
    handleCalculrator();
  };

  /**
   * 자재 사이즈와 작업 면적을 계산하는 함수입니다.
   */
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

  /**
   * 예산 소모량 섹션을 보이게할지 보이지 않게끔할지 컨트롤합니다.
   */
  const onVisibleBtn = useCallback(() => {
    setVisible(false);
  }, []);

  /**
   * 자재 소모량 계산기 헤더 부분 클릭 함수입니다.
   * 이 클릭시
   */
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
    // setVisible(false);
  }, []);

  return (
    <>
      <div>
        {/* 계산기 헤더 */}
        <div className="mb-10">
          <ul className="flex items-center justify-between">
            {ResouresCalculatorList.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    onSelectItem(index);
                  }}
                  key={item}
                  className={`flex contents-center w-full px-6 py-3 mr-4 border rounded-lg cursor-pointer ${
                    selectItem === index ? "border-black" : "border-gray05 opacity-40"
                  } `}
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
            <div className="flex items-center justify-between pb-6 mb-10 border border-b-black">
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
