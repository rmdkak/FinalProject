import React from "react";

import { useServiceStore } from "store";

import { BG_SIZE_CONTROL_BTN_IMAGE_MAPPER } from "./data";
interface Props {
  type: "leftWall" | "rightWall" | "tile";
}
let bgCount: number[];
export const BgSizeSelectcontrolBtn = ({ type }: Props): JSX.Element => {
  const { selectBg, setSelectBg } = useServiceStore();
  const selectBgType = selectBg === type ? "bg-[#00000080]" : "";

  switch (type) {
    case "leftWall":
      bgCount = [7, 8];
      break;
    case "rightWall":
      bgCount = [7, 8];
      break;
    case "tile":
      bgCount = [5, 6];
      break;
    default:
      console.error("error");
  }

  const [firstIndex, secondIndex] = bgCount;
  return (
    <>
      <button
        onClick={() => {
          setSelectBg(type);
        }}
        className={`flex bg-[#00000040] w-6 h-6 mr-2 rounded contents-center active:bg-[#00000060] ${selectBgType}`}
      >
        <div className={`${type === "rightWall" ? "scale-x-[-1]" : ""}`}>
          <img
            width={24}
            height={24}
            src={
              selectBg === type
                ? BG_SIZE_CONTROL_BTN_IMAGE_MAPPER[secondIndex as 2]
                : BG_SIZE_CONTROL_BTN_IMAGE_MAPPER[firstIndex as 1]
            }
            alt={`${type} 이미지`}
          />
        </div>
      </button>
    </>
  );
};
