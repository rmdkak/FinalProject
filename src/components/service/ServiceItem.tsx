import { useEffect, useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

import { useServiceStore } from "store";
import { type Tables } from "types/supabase";

import { tileTextureList, wallPaperTextureList } from "./data";
import { SelfPattern } from "./SelfPattern";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
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
  const {
    checkType,
    resetWallPaper,
    resetTile,
    setTile,
    setWallPaper,
    setWallpaperPaint,
    resetWallpaperPaint,
    interiorSelecteIndex,
    interiorSelectX,
  } = useServiceStore((state) => state);
  const [color, setColor] = useState<string>("");

  // 페이지 마운트, 언마운트시 전역데이터 초기화
  useEffect(() => {
    // console.log("페이지 마운트됨");
    resetWallPaper();
    resetTile();
  }, []);

  /**
   *
   * @param image "매개변수 'image'는 클릭한 이미지의 경로 또는 식별자를 나타냅니다. 이 함수는 전역 상태 관리를 위해 'zustand'를 사용하여 이미지 값을 저장합니다. 저장된 이미지 값은 왼쪽의 인테리어 비주얼 요소에 표시되도록 설정됩니다."
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

  const changeColorPicker = (color: ColorResult) => {
    setColor(color.hex);

    interiorSelectX ? setWallpaperPaint(color.hex, "left") : setWallpaperPaint(color.hex, "right");
  };

  // type 에 따라 CHECK_DATA의 값이 바뀝니다.
  // 이 값은 벽지 타이틀이름 배열과, 바닥재 타이틀이름 배열입니다.
  const CHECK_DATA = checkType === "wallPaper" ? tileTextureList : wallPaperTextureList;

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
  };
  // 인테리어 헤더부분 리스트아이템 선택시 그 선택아이템의 값을 영어로 변환해 filterDate 에 매개변수로 전달합니다.
  // 값이 없을경우 filterDate = data(전체데이터) 로 할당됩니다.
  let changeName: string = "";
  switch (CHECK_DATA[interiorSelecteIndex]) {
    case CHECK_DATA[0]:
      changeName = CHECK_DATA[0] === "장판" ? "wallPaper" : "floorMat";
      filterDate(changeName);
      break;
    case CHECK_DATA[1]:
      changeName = CHECK_DATA[1] === "마루" ? "paint" : "floor";
      filterDate(changeName);
      break;
    case CHECK_DATA[2]:
      changeName = CHECK_DATA[2] === "데코타일" ? "tile" : "decorationtile";
      filterDate(changeName);
      break;
    case CHECK_DATA[3]:
      changeName = CHECK_DATA[3] === "포세린" ? "poserin" : "poserin";
      filterDate(changeName);
      break;
    case CHECK_DATA[4]:
      changeName = CHECK_DATA[4] === "셀프조합" ? "self" : "self";
      break;

    default:
      filterData = data;
      break;
  }

  if (CHECK_DATA[interiorSelecteIndex] === "셀프조합") {
    return <SelfPattern />;
  }

  if (interiorSelecteIndex === 1 && checkType === "wallPaper") {
    return (
      <SketchPicker
        color={color}
        onChange={(color: ColorResult) => {
          changeColorPicker(color);
        }}
        disableAlpha={true}
      />
    );
  } else {
    return (
      <>
        {filterData.map((item) => {
          const { id, image } = item;
          return (
            <li
              onClick={() => {
                getItemData({ id, image });
              }}
              key={id}
              className="cursor-pointer interior-item"
            >
              <img src={`${STORAGE_URL}${image}`} className="interior-item" alt={` ${checkType} 미리보기 이미지`} />
            </li>
          );
        })}
      </>
    );
  }
};
