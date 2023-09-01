import React from "react";

import { useServiceStore } from "store";
interface Props {
  image: string;
  id: string;
}

export const ServiceSelectItem = ({ image, id }: Props): JSX.Element => {
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
  /**
   *
   * @param selectItem  selectItem 전역적으로 관리할 값 {id:고유 아이디, image:이미지 경로}
   */
  const getItemData = (selectItem: { id: string; image: string }): void => {
    if (checkType === "wallPaper") {
      resetWallpaperPaint();
      interiorSelectX ? setWallPaper(selectItem, "left") : setWallPaper(selectItem, "right");
    }
    if (checkType === "tile") {
      setTile(selectItem);
    }
  };
  /**
   * 왼쪽 벽지 클릭시 나오는 보더
   */
  const CHECK_LEFT_ITEM_BORDER = onClickItemBorder.left === id ? "border-[#CD0D0D]" : "";
  /**
   * 오른쪽 벽지 클릭시 나오는 보더
   */
  const CHECK_RIGHT_ITEM_BORDER = onClickItemBorder.right === id ? "border-[#1DCFBF]" : "";
  /**
   * 타일 클릭시 나오는 보더
   */
  const CHECK_TILE_ITEM_BORDER = onClickItemBorder.tile === id ? "border-[#3E16F1]" : "";
  /**
   * 왼쪽 벽지, 오른쪽 벽지가 같을경우나오는 보더
   */
  const CHECK_LEFT_RIGHT_BORDER =
    onClickItemBorder.left === id && onClickItemBorder.right === id ? "border-[#E52689]" : "";
  return (
    <>
      <li
        onClick={() => {
          getItemData({ id, image });
          setClickItemBorder(id, interiorSelectX, checkType);
        }}
        key={id}
        className={`cursor-pointer interior-item`}
      >
        <img
          src={`${STORAGE_URL}${image}`}
          className={`block interior-item border-8 border-white  ${CHECK_LEFT_ITEM_BORDER} ${CHECK_RIGHT_ITEM_BORDER} ${CHECK_TILE_ITEM_BORDER} ${CHECK_LEFT_RIGHT_BORDER} `}
          alt={` ${checkType} 미리보기 이미지`}
        />
      </li>
    </>
  );
};
