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
  const CHECK_LEFT_ITEM_BORDER = onClickItemBorder.left === id ? `4px solid ${SELECT_BORDER_COLOR}` : "";
  /**
   * 오른쪽 벽지 클릭시 나오는 보더
   */
  const CHECK_RIGHT_ITEM_BORDER = onClickItemBorder.right === id ? `4px solid ${SELECT_BORDER_COLOR}` : "";
  /**
   * 타일 클릭시 나오는 보더
   */
  const CHECK_TILE_ITEM_BORDER = onClickItemBorder.tile === id ? `4px solid ${SELECT_BORDER_COLOR}` : "";

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
          style={
            onClickItemBorder.left === id
              ? { border: CHECK_LEFT_ITEM_BORDER }
              : onClickItemBorder.right === id
              ? { border: CHECK_RIGHT_ITEM_BORDER }
              : { border: CHECK_TILE_ITEM_BORDER }
          }
          className={`block interior-item border-4 drag-none
           `}
          alt={` ${checkType} 미리보기 이미지`}
        />
      </li>
    </>
  );
};
