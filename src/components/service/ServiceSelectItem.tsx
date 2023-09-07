import React from "react";

import { useServiceStore } from "store";
import { handleCheckTypeItemBorder } from "utils/interiorSection";

interface Props {
  image: string;
  id: string;
}

export const ServiceSelectItemMemoization = ({ image, id }: Props): JSX.Element => {
  const {
    checkType,
    resetWallpaperPaint,
    interiorSelectX,
    setClickItemBorder,
    setWallPaper,
    setTile,
    onClickItemBorder,
  } = useServiceStore((state) => state);
  const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

  const getItemData = (selectItem: { id: string; image: string }): void => {
    if (checkType === "wallPaper") {
      resetWallpaperPaint();
      interiorSelectX ? setWallPaper(selectItem, "left") : setWallPaper(selectItem, "right");
    }
    if (checkType === "tile") {
      setTile(selectItem);
    }
  };

  const checkLeftItemBorder = handleCheckTypeItemBorder(onClickItemBorder.left, id);
  const checkRightItemBorder = handleCheckTypeItemBorder(onClickItemBorder.right, id);
  const checkTileItemBorder = handleCheckTypeItemBorder(onClickItemBorder.tile, id);

  const borderSelectStyle =
    onClickItemBorder.left === id
      ? { border: checkLeftItemBorder }
      : onClickItemBorder.right === id
      ? { border: checkRightItemBorder }
      : { border: checkTileItemBorder };

  return (
    <>
      <li
        onClick={() => {
          getItemData({ id, image });
          setClickItemBorder(id, interiorSelectX, checkType);
        }}
        key={id}
        style={borderSelectStyle}
        className="overflow-hidden rounded-full interior-item"
      >
        <img
          src={`${STORAGE_URL}${image}`}
          width={80}
          height={80}
          className="cursor-pointer drag-none"
          alt={`${checkType} 미리보기 이미지`}
        />
      </li>
    </>
  );
};

export const ServiceSelectItem = React.memo(ServiceSelectItemMemoization);
