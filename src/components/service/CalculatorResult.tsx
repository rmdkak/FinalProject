import React from "react";
interface Props {
  resultName: string;
  result: string;
  meter?: boolean;
}

const CalculatorResult = ({ resultName, result, meter }: Props): JSX.Element => {
  // console.log(resultName, result);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3>{resultName}</h3>
        <span>
          {/* 결과값 */}
          <span>{result}</span>
          {/* 오른쪽 평방미터 */}
          {meter !== true ? (
            <span>
              m<sup>2</sup>
            </span>
          ) : (
            <span>(로스율 10% 포함)</span>
          )}
        </span>
      </div>
    </>
  );
};

export default CalculatorResult;
