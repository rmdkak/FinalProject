import React from "react";
interface Props {
  label: string;
  firstPlaceholder: string;
  secondPlaceholder: string;
  propId: string;
}

const CalculatorArticle = ({ propId, label, firstPlaceholder, secondPlaceholder }: Props): JSX.Element => {
  return (
    <>
      <article>
        <label htmlFor={propId} className="absolute top-[-9999px] left-[-9999px]">
          {label}
        </label>
        <h3 className="mb-4">{label}</h3>

        <div className="flex items-center mb-6">
          <div className="w-full relative before:content-['mm'] before:absolute before:top-[50%] before:translate-y-[-50%] before:text-gray04 before:z-[0] before:right-4">
            <input
              className="rounded-lg max-w-[187px] flex h-10 px-4 border border-gray05 text-gray04 appearance-none inputNumberArrow"
              id={propId}
              type="number"
              placeholder={firstPlaceholder}
            />
          </div>
          <span className="mx-2">X</span>
          <div className="w-full relative before:content-['mm'] before:absolute before:top-[50%] before:translate-y-[-50%] before:text-gray04 before:z-[0] before:right-4">
            <input
              className="rounded-lg max-w-[187px] flex h-10 px-4 border border-gray05 text-gray04 appearance-none inputNumberArrow"
              id={propId}
              type="number"
              placeholder={secondPlaceholder}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default CalculatorArticle;
