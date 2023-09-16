import { useState, useEffect } from "react";

import { STORAGE_URL } from "api/supabase/supabaseClient";

interface Props {
  interiorItemId: InteriorItem;
  type: "mypage" | "post";
}

interface InteriorItem {
  leftWallpaperId?: string | null;
  stateLeftWallpaperId?: string | null;
  rightWallpaperId?: string | null;
  stateRightWallpaperId?: string | null;
  wallpaperPaint?: {
    left: string | null;
    right: string | null;
  };
  stateWallpaperPaint?: {
    left: string | null;
    right: string | null;
  };
  tileId?: string | null;
  stateTileId?: string | null;
}

interface ClassObject {
  Box: string;
  leftWallpaper: string;
  rightWallpaper: string;
  wallpaperPaint: {
    left: string;
    right: string;
  };
  tile: string;
  emptyLeftData: string;
  emptyRightData: string;
  emptyTileData: string;
}

export const InteriorCombination = ({ interiorItemId, type }: Props) => {
  const {
    leftWallpaperId,
    rightWallpaperId,
    stateLeftWallpaperId,
    stateRightWallpaperId,
    wallpaperPaint,
    stateWallpaperPaint,
    tileId,
    stateTileId,
  } = interiorItemId;

  const initialClass = {
    Box: "",
    leftWallpaper: "",
    rightWallpaper: "",
    tile: "",
    wallpaperPaint: { left: "", right: "" },
    emptyLeftData: "",
    emptyRightData: "",
    emptyTileData: "",
  };

  const [classObject, setClassObject] = useState<ClassObject>(initialClass);

  useEffect(() => {
    const mypageCommon = "absolute w-20 h-20 border-2 border-white rounded-full";
    const mypageResponsive = "xs:w-12 xs:h-12";
    switch (type) {
      case "mypage":
        setClassObject({
          Box: "relative flex h-20 w-60 gap-11 contents-center sm:mt-4",
          wallpaperPaint: {
            left: `${mypageCommon} ${mypageResponsive} -translate-x-3/4 sm:-translate-x-2/3`,
            right: `${mypageCommon} ${mypageResponsive}`,
          },
          leftWallpaper: `${mypageCommon} ${mypageResponsive} -translate-x-3/4 sm:-translate-x-2/3`,
          rightWallpaper: `${mypageCommon} ${mypageResponsive}`,
          tile: `${mypageCommon} ${mypageResponsive} translate-x-3/4 sm:translate-x-2/3`,
          emptyLeftData: `${mypageCommon} bg-gray06 -translate-x-3/4 sm:-translate-x-2/3`,
          emptyRightData: `${mypageCommon} bg-gray06`,
          emptyTileData: `${mypageCommon} bg-gray06 translate-x-3/4 sm:translate-x-2/3`,
        });
        break;

      case "post":
        setClassObject({
          Box: "relative flex items-center",
          wallpaperPaint: {
            left: "min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[70px] xs:right-[60px] border border-gray05",
            right:
              "min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[40px] xs:right-[35px] border border-gray05",
          },
          leftWallpaper:
            "min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[70px] xs:right-[60px] border border-gray05",
          rightWallpaper:
            "min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[40px] xs:right-[35px] border border-gray05",
          tile: "min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[10px] border border-gray05",
          emptyLeftData:
            "bg-gray06 min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[70px] xs:right-[60px] border border-gray01",
          emptyRightData:
            "bg-gray06 min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[40px] xs:right-[35px] border border-gray01",
          emptyTileData:
            "bg-gray06 min-w-[40px] min-h-[40px] xs:min-w-[32px] xs:min-h-[32px] rounded-full absolute right-[10px] border border-gray01",
        });
        break;
    }
  }, [type, interiorItemId]);

  return (
    <div className={classObject.Box}>
      {stateLeftWallpaperId != null ? (
        <img
          src={`${STORAGE_URL}/wallpaper/${stateLeftWallpaperId}`}
          className={classObject.leftWallpaper}
          alt="왼쪽 벽지"
        />
      ) : stateWallpaperPaint?.left != null ? (
        <div className={classObject.wallpaperPaint.left} style={{ backgroundColor: stateWallpaperPaint.left }} />
      ) : leftWallpaperId != null ? (
        <img
          src={`${STORAGE_URL}/wallpaper/${leftWallpaperId}`}
          className={classObject.leftWallpaper}
          alt="왼쪽 벽지"
        />
      ) : wallpaperPaint?.left != null ? (
        <div className={classObject.wallpaperPaint.left} style={{ backgroundColor: wallpaperPaint.left }} />
      ) : (
        <div className={classObject.emptyLeftData} />
      )}
      {stateRightWallpaperId != null ? (
        <img
          src={`${STORAGE_URL}/wallpaper/${stateRightWallpaperId}`}
          className={classObject.rightWallpaper}
          alt="오른쪽 벽지"
        />
      ) : stateWallpaperPaint?.right != null ? (
        <div className={classObject.wallpaperPaint.right} style={{ backgroundColor: stateWallpaperPaint.right }} />
      ) : rightWallpaperId != null ? (
        <img
          src={`${STORAGE_URL}/wallpaper/${rightWallpaperId}`}
          className={classObject.rightWallpaper}
          alt="오른쪽 벽지"
        />
      ) : wallpaperPaint?.right != null ? (
        <div className={classObject.wallpaperPaint.right} style={{ backgroundColor: wallpaperPaint.right }} />
      ) : (
        <div className={classObject.emptyRightData} />
      )}
      {stateTileId != null ? (
        <img src={`${STORAGE_URL}/tile/${stateTileId}`} className={classObject.tile} alt="타일" />
      ) : tileId != null ? (
        <img src={`${STORAGE_URL}/tile/${tileId}`} className={classObject.tile} alt="타일" />
      ) : (
        <div className={classObject.emptyTileData} />
      )}
    </div>
  );
};
