import React from "react";

import { useServiceStore } from "store";
import { type LeftorRight } from "types/service";
import { handleWallLeftRightTypeCheck } from "utils/servise/interiorSection";

interface Props {
  type: LeftorRight;
}
const WallpaperLeftRightTitleMemoization = ({ type }: Props): JSX.Element => {
  const { checkType, interiorSelectX, setLeftInteriorSelectX, setRightInteriorSelectX } = useServiceStore(
    (state) => state,
  );
  return (
    <>
      <span
        className={handleWallLeftRightTypeCheck(interiorSelectX, type)}
        onClick={() => {
          type === "left" ? setLeftInteriorSelectX() : setRightInteriorSelectX();
        }}
      >
        {checkType === "wallPaper"
          ? `${type === "left" ? "좌측" : "우측"}벽지`
          : `${type === "left" ? "좌측" : "우측"}배치`}
      </span>
    </>
  );
};

export const WallpaperLeftRightTitle = React.memo(WallpaperLeftRightTitleMemoization);
