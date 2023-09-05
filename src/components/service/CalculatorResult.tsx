import React from "react";
interface Props {
  resultName: string;
  result: string;
  meter?: boolean;
}

const CalculatorResult = ({ resultName, result, meter }: Props): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3>{resultName}</h3>
        <span>
          <span>{result !== "NaN" ? result : "정상적인 수치를 입력해주세요"}</span>
          {meter !== true && (
            <>
              <span>
                m<sup>2</sup>
              </span>
              <span>(로스율 10% 포함)</span>
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default CalculatorResult;
