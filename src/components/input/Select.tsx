import { useState, type MouseEvent, type ChangeEvent, type Dispatch } from "react";
import { FaAngleDown } from "react-icons/fa";

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
  const commonStyle = "w-full px-[24px] py-[8px] cursor-pointer focus:outline-none hover:bg-gray05";

  return (
    <div className={`relative w-[100%] h-[50px]`}>
      {selfEnterIsOpen ? (
        <>
          <button className="flex w-full h-[50px] auth-input" type="button" onClick={changeToggleHandler}>
            <p className={`whitespace-nowrap`}>{selectedValue !== undefined ? selectedValue : placeholder}</p>
            <FaAngleDown className="absolute w-[16px] h-[16px] right-[24px] top-1/2 text-gray02 translate-y-[-50%] cursor-pointer" />
          </button>
        </>
      ) : (
        <>
          <input
            onChange={(event) => {
              setSelectedValue(event?.target.value);
            }}
            value={selectedValue}
            className={`w-[100%] $"auth-input"`}
          />
          <FaAngleDown
            onClick={changeToggleHandler}
            className="absolute w-[16px] h-[16px] right-[24px] top-1/2 text-gray02 translate-y-[-50%] cursor-pointer"
          />
        </>
      )}
      <div className={`absolute w-full top-[50px] bg-white z-50`}>
        {toggleIsOpen &&
          option.map((el) => (
            <div key={el} onClick={onChangeHandler} className={`${commonStyle}`}>
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
            className={`${commonStyle}`}
          >
            직접 입력
          </div>
        )}
      </div>
    </div>
  );
};
