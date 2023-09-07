import React, { useState, useCallback, useEffect } from "react";

import { supabase } from "api/supabase";
import { ServiceItemSkeleton } from "components/common/skeletonUI";
import { useServiceStore } from "store";
import { type WallOrTile } from "types/service";
import { type Tables } from "types/supabase";
import { handleCheckType } from "utils/interiorSection";

import { SELECT_PAINT_INDEX, TILE_TEXTURE_LIST, WALLPAPER_TEXTURE_LIST } from "./data";
import { ServiceItem } from "./ServiceItem";
import { TextureTitle } from "./TextureTitle";

interface Props {
  onCheckCustom?: boolean;
}

export const InteriorSection = ({ onCheckCustom }: Props): JSX.Element => {
  const [wallData, setWallData] = useState<Array<Tables<"WALLPAPER", "Row">>>([]);
  const [tileData, setTileData] = useState<Array<Tables<"TILE", "Row">>>([]);
  const {
    checkType,
    setTypeCheck,
    interiorSelectX,
    interiorSelecteIndex,
    setLeftInteriorSelectX,
    setRightInteriorSelectX,
  } = useServiceStore((state) => state);

  const fetchData = useCallback(async () => {
    try {
      const { data: wallPaper } = await supabase.from("WALLPAPER").select("*");
      const { data: tale } = await supabase.from("TILE").select("*");
      setWallData(wallPaper as Array<Tables<"WALLPAPER", "Row">>);
      setTileData(tale as Array<Tables<"TILE", "Row">>);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData().catch((error) => error(error));
  }, []);

  const onClickTypeSwitch = (type: WallOrTile) => {
    setTypeCheck(type);
  };

  return (
    <>
      {/* 인테리어 헤더 */}
      <div className="gap-8 text-gray-300 flex-column">
        <div className="flex gap-6">
          <span
            className={handleCheckType(checkType, "wallPaper")}
            onClick={() => {
              onClickTypeSwitch("wallPaper");
            }}
          >
            벽지
          </span>
          <span
            className={handleCheckType(checkType, "tile")}
            onClick={() => {
              onClickTypeSwitch("tile");
            }}
          >
            바닥재
          </span>
        </div>
        {checkType === "wallPaper" ? (
          <div className="gap-8 flex-column">
            {/* 벽지 종류 목록 */}
            <TextureTitle
              data={(onCheckCustom as boolean) ? WALLPAPER_TEXTURE_LIST : WALLPAPER_TEXTURE_LIST.slice(0, -1)}
            />
            <div className="flex gap-4">
              <span
                className={interiorSelectX ? "selected-wall-point" : "hover:cursor-pointer text-gray03"}
                onClick={() => {
                  setLeftInteriorSelectX();
                }}
              >
                좌측 벽지
              </span>
              <span
                className={!interiorSelectX ? "selected-wall-point" : "hover:cursor-pointer text-gray03"}
                onClick={() => {
                  setRightInteriorSelectX();
                }}
              >
                우측 벽지
              </span>
            </div>
          </div>
        ) : checkType === "tile" ? (
          <>
            {/* 타일 종류 목록 */}
            <TextureTitle data={(onCheckCustom as boolean) ? TILE_TEXTURE_LIST : TILE_TEXTURE_LIST.slice(0, -1)} />
          </>
        ) : (
          <></>
        )}
      </div>

      {/* 인테리어 바디 */}
      <div>
        <ul
          className={`flex flex-wrap w-full gap-x-4 gap-y-4 ${
            interiorSelecteIndex === SELECT_PAINT_INDEX && checkType === "wallPaper" ? "" : "h-[176px]"
          } overflow-y-auto`}
        >
          {checkType === "wallPaper" ? (
            wallData.length === 0 ? (
              <ServiceItemSkeleton />
            ) : (
              <ServiceItem data={wallData} />
            )
          ) : tileData.length === 0 ? (
            <ServiceItemSkeleton />
          ) : (
            <ServiceItem data={tileData} />
          )}
        </ul>
      </div>
    </>
  );
};
