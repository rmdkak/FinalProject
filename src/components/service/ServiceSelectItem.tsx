import { STORAGE_URL } from "api/supabase";
import { useServiceStore } from "store";

import { SELECT_BORDER_COLOR } from "./data";

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

  const getItemData = (selectItem: { id: string; image: string }): void => {
    if (checkType === "wallPaper") {
      resetWallpaperPaint();
      interiorSelectX ? setWallPaper(selectItem, "left") : setWallPaper(selectItem, "right");
    }
    if (checkType === "tile") {
      setTile(selectItem);
    }
  };

  const checkLeftItemBorder = onClickItemBorder.left === id ? `4px solid ${SELECT_BORDER_COLOR}` : "1px solid #d5d5d5";
  const checkRightItemBorder =
    onClickItemBorder.right === id ? `4px solid ${SELECT_BORDER_COLOR}` : "1px solid #d5d5d5";
  const checkTileItemBorder = onClickItemBorder.tile === id ? `4px solid ${SELECT_BORDER_COLOR}` : "1px solid #d5d5d5";

  return (
    <>
      <li
        onClick={() => {
          getItemData({ id, image });
          setClickItemBorder(id, interiorSelectX, checkType);
        }}
        key={id}
      >
        <img
          src={`${STORAGE_URL}${image}`}
          style={
            onClickItemBorder.left === id
              ? { border: checkLeftItemBorder }
              : onClickItemBorder.right === id
              ? { border: checkRightItemBorder }
              : { border: checkTileItemBorder }
          }
          className={`interior-item drag-none cursor-pointer`}
          alt={` ${checkType} 미리보기 이미지`}
        />
      </li>
    </>
  );
};
