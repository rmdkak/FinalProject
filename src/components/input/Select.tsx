import { useState, type MouseEvent, type ChangeEvent, type Dispatch } from "react";

import arrowIcon from "assets/arrowIcon.svg";

interface Props {
  option: string[];
  selectedValue: string | undefined;
  setSelectedValue: Dispatch<React.SetStateAction<string | undefined>>;
  placeholder?: string;
  selfEnterOption: boolean;
}

export const Select = (props: Props) => {
  const { option, selectedValue, setSelectedValue, placeholder = "선택해주세요.", selfEnterOption } = props;

  const [toggleIsOpen, setToggleIsOpen] = useState(false);
  const [selfEnterIsOpen, setSelfEnterIsOpen] = useState(true);

  const onChangeHandler = (event: MouseEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
    if (event.target === null) return;
    setSelectedValue(event.currentTarget.innerText);
    setSelfEnterIsOpen(true);
    setToggleIsOpen(false);
  };

  const changeToggleHandler = () => {
    setToggleIsOpen(!toggleIsOpen);
  };

  // TODO 공용 input style 정해지면 변경 import
  const commonStyle = "px-[24px] py-[12px] border-[1px] border-[#888888] focus:outline-none";

  return (
    <div className={`relative w-[100%] h-[50px]`}>
      {selfEnterIsOpen ? (
        <>
          <button className={`flex w-full h-[50px] ${commonStyle}`} type="button" onClick={changeToggleHandler}>
            <p className={`whitespace-nowrap`}>{selectedValue !== undefined ? selectedValue : placeholder}</p>
            <img className="absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer" src={arrowIcon} />
          </button>
        </>
      ) : (
        <>
          <input
            onChange={(event) => {
              setSelectedValue(event?.target.value);
            }}
            value={selectedValue}
            className={`w-[100%] ${commonStyle}`}
          />
          <img
            onClick={changeToggleHandler}
            className="absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer"
            src={arrowIcon}
          />
        </>
      )}
      <div className={`absolute w-full top-[50px] bg-white z-50`}>
        {toggleIsOpen &&
          option.map((el) => (
            <div
              key={el}
              onClick={onChangeHandler}
              className={`w-full ${commonStyle}] cursor-pointer hover:bg-gray-300`}
            >
              {el}
            </div>
          ))}
        {toggleIsOpen && selfEnterOption && (
          <div
            onClick={() => {
              setSelectedValue("");
              setToggleIsOpen(false);
              setSelfEnterIsOpen(false);
            }}
            className={`w-full ${commonStyle}] cursor-pointer hover:bg-gray-300`}
          >
            직접 입력
          </div>
        )}
      </div>
    </div>
  );
};
