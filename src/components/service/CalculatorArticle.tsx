import React, { type Dispatch, type SetStateAction } from "react";

import { type WidthHeight } from "types/calculator";
interface Props {
  label: string;
  firstPlaceholder: string;
  secondPlaceholder: string;
  propId: string;
  state: WidthHeight;
  setState: Dispatch<SetStateAction<WidthHeight>>;
  selectItem?: number;
}

const CalculatorArticle = ({
  propId,
  label,
  firstPlaceholder,
  secondPlaceholder,
  state,
  setState,
  selectItem,
}: Props): JSX.Element => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <>
      <article>
        <label htmlFor={propId} className="absolute top-[-9999px] left-[-9999px]">
          {label}
        </label>
        <h3 className="mb-4">{label}</h3>

        <div className="flex items-center mb-6">
          <div
            className={`relative flex items-center  justify-center w-full ${
              selectItem === 0 ? "after:content-['m']" : "after:content-['mm']"
            } after:absolute after:top-[50%] after:right-4 after:translate-y-[-50%]`}
          >
            <input
              className="box-border rounded-lg pl-4 pr-12 max-w-[187px] flex h-10 border border-gray05 text-gray04 appearance-none inputNumberArrow"
              id={propId}
              value={state.width}
              name="width"
              type="number"
              placeholder={firstPlaceholder}
              //   value={width}
              onChange={onChangeInput}
            />
          </div>
          <span className="mx-2">X</span>
          <div
            className={`relative flex items-center  justify-center w-full ${
              selectItem === 0 ? "after:content-['m']" : "after:content-['mm']"
            } after:absolute after:top-[50%] after:right-4 after:translate-y-[-50%]`}
          >
            <input
              className="box-border rounded-l pl-4 pr-12 max-w-[187px] flex h-10 border border-gray05 text-gray04 appearance-none inputNumberArrow"
              id={propId}
              value={state.height}
              name="height"
              type="number"
              placeholder={secondPlaceholder}
              //   value={height}
              onChange={onChangeInput}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default CalculatorArticle;
