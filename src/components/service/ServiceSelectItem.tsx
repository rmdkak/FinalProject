import React from "react";

import { useServiceStore } from "store";
import { useFurniture } from "store/useFurniture";
import { type WallOrTileOrFurniture } from "types/service";
import { handleCheckTypeItemBorder } from "utils/servise/interiorSection";

interface Props {
  image: string;
  id: string;
  furniture?: boolean;
}

export const ServiceSelectItemMemoization = ({ image, id, furniture }: Props): JSX.Element => {
  const {
    checkType,
    resetWallpaperPaint,
    interiorSelectX,
    setClickItemBorder,
    setWallPaper,
    setTile,
    onClickItemBorder,
  } = useServiceStore((state) => state);
  const { setFurnitureState } = useFurniture((state) => state);
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

  const handleClickEvent = (
    { id, image }: { id: string; image: string },
    _id: string,
    interiorSelectX: boolean,
    checkType: WallOrTileOrFurniture,
  ) => {
    if (furniture === true) {
      interiorSelectX ? setFurnitureState(image, "left") : setFurnitureState(image, "right");
    } else {
      getItemData({ id, image });
      setClickItemBorder(_id, interiorSelectX, checkType);
    }
  };
  return (
    <>
      <li
        onClick={() => {
          handleClickEvent({ id, image }, id, interiorSelectX, checkType);
        }}
        key={id}
        style={borderSelectStyle}
        className="overflow-hidden rounded-full interior-item"
      >
        <picture className={`box-border block h-full cursor-pointer drag-none`}>
          <source srcSet={`${STORAGE_URL}${image}`} type="image/webp"></source>
          <source srcSet={`${STORAGE_URL}${image}`} type="image/jpg"></source>
          <img src={`${STORAGE_URL}${image}`} alt={`${checkType} 이미지`} />
        </picture>
      </li>
    </>
  );
};

export const ServiceSelectItem = React.memo(ServiceSelectItemMemoization);
