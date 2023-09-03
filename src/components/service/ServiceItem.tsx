import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

import { useServiceStore } from "store";
import { type Tables } from "types/supabase";

import { SELECT_PAINT_INDEX, TILE_TEXTURE_LIST, WALLPAPER_TEXTURE_LIST } from "./data";
import { SelfPattern } from "./SelfPattern";
import { ServiceSelectItem } from "./ServiceSelectItem";

interface Props {
  data: Array<Tables<"WALLPAPER", "Row">>;
}

/**
 *
 * @param data
 * @param type
 * @returns
 */
export const ServiceItem = ({ data }: Props): JSX.Element => {
  const { checkType, resetWallPaper, setWallpaperPaint, interiorSelecteIndex, interiorSelectX } = useServiceStore(
    (state) => state,
  );
  const [color, setColor] = useState<string>("");

  const changeColorPicker = (color: ColorResult) => {
    setColor(color.hex);
    resetWallPaper();
    interiorSelectX ? setWallpaperPaint(color.hex, "left") : setWallpaperPaint(color.hex, "right");
  };

  // type 에 따라 CHECK_DATA의 값이 바뀝니다.
  // 이 값은 벽지 타이틀이름 배열과, 바닥재 타이틀이름 배열입니다.
  const CHECK_DATA = checkType === "wallPaper" ? TILE_TEXTURE_LIST : WALLPAPER_TEXTURE_LIST;

  // 클릭시 스위치에서 보내준 값으로 필터를 돌리는 함수입니다.
  // 그 함수는 변수에 저장됩니다. (useState를 사용하면 무한 렌더링에 걸립니다.)
  let filterData: Array<Tables<"WALLPAPER", "Row">> = [];
  const filterDate = (typeName?: string) => {
    if (typeof typeName === "string") {
      const FILTER_DATA = data.filter((el) => {
        return el.texture === typeName;
      });
      filterData = FILTER_DATA;
    }
    if (typeName === "All") {
      filterData = data;
    }
  };
  // 인테리어 헤더부분 리스트아이템 선택시 그 선택아이템의 값을 영어로 변환해 filterDate 에 매개변수로 전달합니다.
  // 값이 없을경우 filterDate = data(전체데이터) 로 할당됩니다.
  let changeName: string = "";
  switch (CHECK_DATA[interiorSelecteIndex]) {
    case CHECK_DATA[0]:
      changeName = CHECK_DATA[0] === "전체" ? "All" : "All";
      filterDate(changeName);
      break;
    case CHECK_DATA[1]:
      changeName = CHECK_DATA[1] === "장판" ? "wallPaper" : "floorMat";
      filterDate(changeName);
      break;
    case CHECK_DATA[2]:
      changeName = CHECK_DATA[2] === "마루" ? "tile" : "floor";
      filterDate(changeName);
      break;
    case CHECK_DATA[3]:
      changeName = CHECK_DATA[3] === "데코타일" ? "poserin" : "decorationtile";
      filterDate(changeName);
      break;
    case CHECK_DATA[4]:
      changeName = CHECK_DATA[4] === "포세린" ? "paint" : "poserin";
      filterDate(changeName);
      break;
    case CHECK_DATA[5]:
      changeName = CHECK_DATA[5] === "셀프조합" ? "self" : "self";
      break;

    default:
      filterData = data;
      break;
  }

  if (CHECK_DATA[interiorSelecteIndex] === "셀프조합") {
    return <SelfPattern />;
  }

  if (interiorSelecteIndex === SELECT_PAINT_INDEX && checkType === "wallPaper") {
    return (
      <SketchPicker
        color={color}
        onChange={(color: ColorResult) => {
          changeColorPicker(color);
        }}
        disableAlpha={true}
        width="400"
      />
    );
  } else {
    return (
      <>
        {filterData.map((item) => {
          const { id, image } = item;
          return <ServiceSelectItem key={id} image={image} id={id} />;
        })}
      </>
    );
  }
};
