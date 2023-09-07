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

  const checkData = checkType === "wallPaper" ? WALLPAPER_TEXTURE_LIST : TILE_TEXTURE_LIST;

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

  let changeName: string = "";
  switch (checkData[interiorSelecteIndex]) {
    case checkData[1]:
      changeName = checkData[1] === "장판" ? "장판" : "벽지";
      filterDate(changeName);
      break;
    case checkData[2]:
      changeName = checkData[2] === "마루" ? "마루" : "타일";
      filterDate(changeName);
      break;
    case checkData[3]:
      changeName = checkData[3] === "포세린" ? "포세린" : "포세린";
      filterDate(changeName);
      break;
    case checkData[4]:
      changeName = checkData[4] === "데코타일" ? "데코타일" : "페인트";
      filterDate(changeName);
      break;
    case checkData[5]:
      changeName = checkData[5] === "셀프조합" ? "self" : "self";
      break;

    default:
      filterData = data;
      break;
  }

  if (checkData[interiorSelecteIndex] === "셀프조합") {
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
        width="1"
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
