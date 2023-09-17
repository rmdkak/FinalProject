import React, { useState, useCallback, useEffect } from "react";

import { supabase } from "api/supabase/supabaseClient";
import { ServiceItemSkeleton } from "components/common";
import { useServiceStore } from "store";
import { useCoachMarkStore } from "store/useCoachMarkStore";
import { type Tables } from "types/supabase";

import { CoachStepOne, CoachStepTwo } from "./coachMark";
import { FURNITURE_LIST, SELECT_PAINT_INDEX, TILE_TEXTURE_LIST, WALLPAPER_TEXTURE_LIST } from "./data";
import { InteriorTitle } from "./InteriorTitle";
import { ServiceItem } from "./ServiceItem";
import { TextureTitle } from "./TextureTitle";
import { WallpaperLeftRightTitle } from "./WallpaperLeftRightTitle";

interface Props {
  onCheckCustom?: boolean;
}

export const InteriorSection = ({ onCheckCustom }: Props): JSX.Element => {
  const [wallData, setWallData] = useState<Array<Tables<"WALLPAPER", "Row">>>([]);
  const [tileData, setTileData] = useState<Array<Tables<"TILE", "Row">>>([]);
  const [furnitureData, setFurnitureData] = useState<Array<Tables<"FURNITURE", "Row">>>([]);
  const { checkType, interiorSelecteIndex } = useServiceStore((state) => state);
  const { isTutorialPass, activeNumber } = useCoachMarkStore();

  const isStepOne = !isTutorialPass && activeNumber === 1;
  const isStepTwo = !isTutorialPass && activeNumber === 2;

  const fetchData = useCallback(async () => {
    try {
      const { data: wallPaper } = await supabase.from("WALLPAPER").select("*");
      const { data: tale } = await supabase.from("TILE").select("*");
      const { data: furniture } = await supabase.from("FURNITURE").select("*");
      if (furniture === null) return;

      setWallData(wallPaper as Array<Tables<"WALLPAPER", "Row">>);
      setTileData(tale as Array<Tables<"TILE", "Row">>);
      setFurnitureData(furniture as Array<Tables<"FURNITURE", "Row">>);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, []);

  const storedData = localStorage.getItem("currentPage");

  return (
    <>
      {/* 인테리어 헤더 */}
      <div className="box-border gap-8 text-gray-300 flex-column sm:gap-6 sm:box-border sm:pl-6 lg:box-border lg:px-6 md:box-border md:px-6 ">
        <div className={`flex gap-6 ${isStepOne ? "relative z-[9400]" : ""}`}>
          {isStepOne && storedData === "/interior-preview" && <CoachStepOne />}
          <InteriorTitle type="wallPaper">벽지</InteriorTitle>
          <InteriorTitle type="tile">바닥재</InteriorTitle>
          {onCheckCustom === true && <InteriorTitle type="furniture">가구</InteriorTitle>}
        </div>

        {checkType === "wallPaper" ? (
          <div className="gap-8 flex-column">
            <TextureTitle
              data={(onCheckCustom as boolean) ? WALLPAPER_TEXTURE_LIST : WALLPAPER_TEXTURE_LIST.slice(0, -1)}
            />
            <div
              className={`flex gap-4 ${
                isStepTwo ? "relative z-[9400] text-black bg-point rounded-lg px-5 w-[170px]" : ""
              }`}
            >
              {isStepTwo && <CoachStepTwo />}
              <WallpaperLeftRightTitle type="left" />
              <WallpaperLeftRightTitle type="right" />
            </div>
          </div>
        ) : checkType === "tile" ? (
          <TextureTitle data={(onCheckCustom as boolean) ? TILE_TEXTURE_LIST : TILE_TEXTURE_LIST.slice(0, -1)} />
        ) : (
          <>
            <TextureTitle data={(onCheckCustom as boolean) ? FURNITURE_LIST : FURNITURE_LIST.slice(0, -1)} />
            <div className="flex gap-4">
              <WallpaperLeftRightTitle type="left" />
              <WallpaperLeftRightTitle type="right" />
            </div>
          </>
        )}
      </div>

      {/* 인테리어 바디 */}
      <div>
        <ul
          className={`flex flex-wrap box-border w-full gap-x-4 gap-y-4 ${
            interiorSelecteIndex === SELECT_PAINT_INDEX && checkType === "wallPaper" ? "" : "h-[176px]"
          } overflow-y-auto
          sm:px-6
          md:px-6
          lg:px-6
          `}
        >
          {checkType === "wallPaper" &&
            (wallData.length === 0 ? <ServiceItemSkeleton /> : <ServiceItem data={wallData} />)}
          {checkType === "tile" && (wallData.length === 0 ? <ServiceItemSkeleton /> : <ServiceItem data={tileData} />)}
          {checkType === "furniture" &&
            (wallData.length === 0 ? <ServiceItemSkeleton /> : <ServiceItem data={furnitureData} furniture={true} />)}
        </ul>
      </div>
    </>
  );
};
