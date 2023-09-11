import { SELECT_BORDER_COLOR } from "components";
import { type WallOrTileOrFurniture, type LeftorRight } from "types/service";

/**
 *
 * @param CheckType  "tile" | "wallPaper"
 * @param type  "tile" | "wallPaper"
 * @returns string
 *
 */
const handleCheckType = (CheckType: WallOrTileOrFurniture, type: WallOrTileOrFurniture) => {
  return CheckType === type
    ? `rounded-3xl px-10 py-2 bg-point hover:cursor-pointer text-black
    sm:py-[6px] sm:px-6
    xs:py-[6px] xs:px-6
    `
    : `rounded-3xl px-10 py-2 bg-gray07 text-gray03 hover:cursor-pointer 
    sm:py-[6px] sm:px-6
    xs:py-[6px] xs:px-6
    `;
};

/**
 * @param item string
 * @param id string
 * @returns string
 * border style 을 지정해주는 함수입니다.
 */
const handleCheckTypeItemBorder = (item: string, id: string) => {
  return item === id ? `4px solid ${SELECT_BORDER_COLOR}` : "1px solid #d5d5d5";
};

/**
 *
 * @param type LeftorRight
 * @returns 왼쪽벽지, 우측벽지 스타일을 반환하는 함수입니다.
 */
const handleWallLeftRightTypeCheck = (interiorSelectX: boolean, type: LeftorRight) => {
  return type === "left"
    ? interiorSelectX
      ? "selected-wall-point"
      : "hover:cursor-pointer text-gray03"
    : !interiorSelectX
    ? "selected-wall-point"
    : "hover:cursor-pointer text-gray03";
};

export { handleCheckType, handleCheckTypeItemBorder, handleWallLeftRightTypeCheck };
