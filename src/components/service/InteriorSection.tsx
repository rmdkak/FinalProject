import React, { useState, useCallback, useEffect } from "react";

import { supabase } from "api/supabase";
import { ServiceItemSkeleton } from "components/common/skeletonUI";
import { useServiceStore } from "store";
import { type Tables } from "types/supabase";

import { TILE_TEXTURE_LIST, WALLPAPER_TEXTURE_LIST } from "./data";
import { ServiceItem } from "./ServiceItem";
import TextureTitle from "./TextureTitle";

interface Props {
  onCheckCustom?: boolean;
}
/**
 *
 * @param onCheckCustom 커스텀 탭이 활성화, 비활성화 컨트롤하는 boolean 값입니다.
 */
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

  /**
   *  서버에서 타일 리스트 데이터, 벽지 리스트 데이터를 가져오는 함수입니다.
   */
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

  // supabase에서 data정보 가져오기
  useEffect(() => {
    void fetchData();
  }, []);

  /**
   * 
   * @param type 
"매개변수 'type'은 'tile' 또는 'wallPaper'라는 두 가지 중 하나의 값을 받습니다. 이 값은 'onClickTypeSwitch' 함수 내에서 사용되며, 'setTypeCheck' 함수에 전달되어 '|' 연산자를 사용하여 현재 선택된 타입을 갱신합니다."
   */
  const onClickTypeSwitch = (type: "tile" | "wallPaper") => {
    setTypeCheck(type);
  };

  return (
    <>
      {/* 인테리어 헤더 */}
      <div className="gap-8 text-gray-300 flex-column">
        <div className="flex gap-6">
          <span
            className={
              checkType === "wallPaper"
                ? "rounded-3xl px-10 py-2 bg-point hover:cursor-pointer text-black"
                : "rounded-3xl px-10 py-2 bg-gray07 text-gray03 hover:cursor-pointer "
            }
            onClick={() => {
              onClickTypeSwitch("wallPaper");
            }}
          >
            벽지
          </span>
          <span
            className={
              checkType === "tile"
                ? "rounded-3xl px-10 py-2 bg-point hover:cursor-pointer text-black"
                : "rounded-3xl px-10 py-2 bg-gray07 text-gray03 hover:cursor-pointer"
            }
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
            interiorSelecteIndex === 4 && checkType === "wallPaper" ? "" : "h-[176px]"
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
