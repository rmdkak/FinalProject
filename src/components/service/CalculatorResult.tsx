import React from "react";

import { threeDigitComma } from "utils/ResourcesCalculator";
interface Props {
  resultName: string;
  result: string;
  meter?: boolean;
}

const CalculatorResultMemoization = ({ resultName, result, meter }: Props): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3>{resultName}</h3>
        <span>
          <span>{result !== "NaN" ? threeDigitComma(result) : "정상적인 수치를 입력해주세요"}</span>
          {meter === true ? (
            <>
              <span className="ml-1">(로스율 10% 포함)</span>
            </>
          ) : (
            <span className="ml-1">
              m<sup>2</sup>
            </span>
          )}
        </span>
      </div>
    </>
  );
};

export const CalculatorResult = React.memo(CalculatorResultMemoization);
