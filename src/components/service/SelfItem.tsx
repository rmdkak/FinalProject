import React from "react";

import CloseBtn from "assets/svgs/close.svg";
import { useServiceStore } from "store";
import { type Wallpaper } from "types/service";
interface Props {
  item: Wallpaper;
}

export const SelfItem = ({ item }: Props): JSX.Element => {
  const { image, id } = item;
  const { delCustomSelfWallPaper, delCustomSelfTile, checkType, interiorSelectX, setWallPaper, setTile } =
    useServiceStore((state) => state);

  const onClickPreviewCloseBtn = () => {
    if (checkType === "wallPaper") {
      delCustomSelfWallPaper(id as string);
    }
    if (checkType === "tile") {
      delCustomSelfTile(id as string);
    }
  };

  const onClickItem = () => {
    if (checkType === "wallPaper") {
      interiorSelectX ? setWallPaper(item, "left") : setWallPaper(item, "right");
    }
    if (checkType === "tile") {
      setTile(item);
    }
  };

  const checkTypeOfString = typeof image === "string" ? image : "";
  return (
    <>
      {/* 아이템 리스트 */}
      <div className="relative overflow-hidden interior-item">
        {/* 삭제 버튼 */}
        <button onClick={onClickPreviewCloseBtn} className="absolute top-3 right-3">
          <img className="w-3 h-3 transition-all opacity-80 hover:opacity-100" src={CloseBtn} alt="닫기 버튼" />
        </button>
        {/* 이미지 */}
        <picture onClick={onClickItem} className={`box-border block h-full cursor-pointer drag-none`}>
          <source srcSet={`${checkTypeOfString}`} type="image/webp"></source>
          <source srcSet={`${checkTypeOfString}`} type="image/jpg"></source>
          <img src={`${checkTypeOfString}`} alt="셀프 조합 이미지"></img>
        </picture>

        {/* <img
        onClick={onClickItem}
          className={`box-border block h-full cursor-pointer drag-none`}
          src={checkTypeOfString}
          alt="셀프 조합 이미지"
        /> */}
      </div>
    </>
  );
};
