import { useState, useEffect } from "react";

import { STORAGE_URL } from "api/supabase/supabaseClient";

interface Props {
  interiorItemId: {
    leftWallpaperId: string;
    rightWallpaperId: string;
    tileId: string;
  };
  type: "mypage";
}

interface ClassObject {
  Box: string;
  leftWallpaper: string;
  rightWallpaper: string;
  tile: string;
}

export const InteriorCombination = ({ interiorItemId, type }: Props) => {
  const initialClass = { Box: "", leftWallpaper: "", rightWallpaper: "", tile: "" };
  const [classObject, setClassObject] = useState<ClassObject>(initialClass);

  useEffect(() => {
    const mypageCommon = "absolute w-20 h-20 border-2 border-white rounded-full";
    const mypageResponsive = "sm:w-8 sm:h-8";
    switch (type) {
      case "mypage":
        setClassObject({
          Box: "relative flex h-20 w-60 gap-11 contents-center sm:mt-4",
          leftWallpaper: `${mypageCommon} ${mypageResponsive} -translate-x-3/4 sm:-translate-x-2/3`,
          rightWallpaper: `${mypageCommon} ${mypageResponsive}`,
          tile: `${mypageCommon} ${mypageResponsive} translate-x-3/4 sm:translate-x-2/3`,
        });
        break;
    }
  }, [type, interiorItemId]);

  return (
    <li className={classObject.Box}>
      <img
        src={`${STORAGE_URL}/wallpaper/${interiorItemId.leftWallpaperId}`}
        className={classObject.leftWallpaper}
        alt="왼쪽 벽지"
      />
      <img
        src={`${STORAGE_URL}/wallpaper/${interiorItemId.rightWallpaperId}`}
        className={classObject.rightWallpaper}
        alt="오른쪽 벽지"
      />
      <img src={`${STORAGE_URL}/tile/${interiorItemId.tileId}`} className={classObject.tile} alt="타일" />
    </li>
  );
};
