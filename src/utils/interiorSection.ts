import { SELECT_BORDER_COLOR } from "components";
import { type WallOrTile } from "types/service";

/**
 *
 * @param CheckType  "tile" | "wallPaper"
 * @param type  "tile" | "wallPaper"
 * @returns string
 *
 */
const handleCheckType = (CheckType: WallOrTile, type: WallOrTile) => {
  return CheckType === type
    ? "rounded-3xl px-10 py-2 bg-point hover:cursor-pointer text-black"
    : "rounded-3xl px-10 py-2 bg-gray07 text-gray03 hover:cursor-pointer ";
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

export { handleCheckType, handleCheckTypeItemBorder };
