import React from "react";

import CloseBtn from "assets/close.svg";
import { type Wallpaper, useServiceStore } from "store";
interface Props {
  item: Wallpaper;
}

export const SelfItem = ({ item }: Props): JSX.Element => {
  const { image, id } = item;
  const { delCustomSelfWallPaper, delCustomSelfTile, checkType, interiorSelectX, setWallPaper, setTile } =
    useServiceStore((state) => state);

  /**
   * 셀프조합 삭제 이벤트 함수
   */
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
      //
      interiorSelectX ? setWallPaper(item, "left") : setWallPaper(item, "right");
    }
    if (checkType === "tile") {
      //
      setTile(item);
    }
  };
  // 타입가드
  const CHECK_TYPE_OF_STRING = typeof image === "string" ? image : "";
  return (
    <>
      {/* 아이템 리스트 */}
      <div className="relative overflow-hidden interior-item">
        {/* 닫기 버튼 */}
        <button onClick={onClickPreviewCloseBtn} className="absolute top-3 right-3">
          <img className="w-3 h-3 transition-all opacity-80 hover:opacity-100" src={CloseBtn} alt="닫기 버튼" />
        </button>
        {/* 이미지 */}
        <img
          onClick={onClickItem}
          className="block h-full cursor-pointer "
          src={CHECK_TYPE_OF_STRING}
          alt="셀프 조합 이미지"
        />
      </div>
    </>
  );
};
