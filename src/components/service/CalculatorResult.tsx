import React from "react";
interface Props {
  resultName: string;
}

const CalculatorResult = ({ resultName }: Props): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3>{resultName}</h3>
        <span>
          {/* 결과값 */}
          {`${20}`}
          {/* 오른쪽 평방미터 */}
          <span>
            m<sup>2</sup>
          </span>
        </span>
      </div>
    </>
  );
};

export default CalculatorResult;
