import React, { useCallback, useState } from "react";

import { useServiceStore } from "store";

import { BG_SIZE_CONTROL_BTN_IMAGE_MAPPER } from "./data";
interface Props {
  type: "plus" | "minus";
}

let bgSizeControl: number[];

export const BgSizecontrolBtn = ({ type }: Props): JSX.Element => {
  const [controlScale, setControlScale] = useState<boolean>(false);
  const { selectBg, setIncreseSelectBgSize, setDecreseSelectBgSize } = useServiceStore();
  switch (type) {
    case "plus":
      bgSizeControl = [4, 3];
      break;
    case "minus":
      bgSizeControl = [2, 1];
      break;
    default:
  }
  const [first, second] = bgSizeControl;

  const handleSizeControlBtn = () => {
    if (type === "plus") {
      setIncreseSelectBgSize(selectBg);
    }
    if (type === "minus") {
      setDecreseSelectBgSize(selectBg);
    }
  };

  return (
    <>
      <button
        onClick={handleSizeControlBtn}
        onMouseDown={useCallback(() => {
          setControlScale(true);
        }, [])}
        onMouseUp={useCallback(() => {
          setControlScale(false);
        }, [])}
        className="flex  bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060]"
      >
        <img
          width={24}
          height={24}
          src={
            controlScale ? BG_SIZE_CONTROL_BTN_IMAGE_MAPPER[first as 2] : BG_SIZE_CONTROL_BTN_IMAGE_MAPPER[second as 1]
          }
          alt="증가 버튼이미지"
        />
      </button>
    </>
  );
};
