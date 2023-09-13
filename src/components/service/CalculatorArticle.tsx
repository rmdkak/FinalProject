import React, { type Dispatch, type SetStateAction } from "react";

import { type WidthHeight } from "types/calculator";
interface Props {
  label: string;
  firstPlaceholder: string;
  secondPlaceholder: string;
  state: WidthHeight;
  setState: Dispatch<SetStateAction<WidthHeight>>;
  selectItem?: number;
}

const CalculatorArticleMamoization = ({
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
        <h3 className="mb-4">{label}</h3>

        <div className="flex items-center mb-6">
          <div
            className={`relative  justify-center w-full  ${
              selectItem === 0 ? "after:content-['m']" : "after:content-['mm']"
            } after:absolute after:top-[50%] after:right-4 after:translate-y-[-50%]
            sm:justify-start
            `}
          >
            <input
              className="box-border rounded-lg pl-4 pr-12 max-w-[187px] flex h-10 border border-gray05 text-black appearance-none inputNumberArrow
              sm:w-[100%] sm:max-w-[60vw]
              "
              name="width"
              type="number"
              placeholder={firstPlaceholder}
              onChange={onChangeInput}
              value={state.width}
            />
          </div>
          <span className="mx-2">X</span>
          <div
            className={`relative  justify-center w-full  ${
              selectItem === 0 ? "after:content-['m']" : "after:content-['mm']"
            } after:absolute after:top-[50%] after:right-4 after:translate-y-[-50%]
          sm:justify-start
          `}
          >
            <input
              className="box-border rounded-lg pl-4 pr-12 max-w-[187px] flex h-10 border border-gray05 text-black appearance-none inputNumberArrow
              sm:w-[100%] sm:max-w-[60vw]
              "
              name="height"
              type="number"
              placeholder={secondPlaceholder}
              onChange={onChangeInput}
              value={state.height}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export const CalculatorArticle = React.memo(CalculatorArticleMamoization);
