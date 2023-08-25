import React, { useEffect } from "react";

import { useServiceStore } from "store";

import { tileTextureList, wallPaperTextureList } from "./data";

interface Data {
  category: string[];
  id: string;
  image: string;
  texture: string;
}
interface Props {
  data: Data[];
  type: "tile" | "wallPaper";
}

/**
 *
 * @param data
 * @param type
 * @returns
 */
export const ServiceItem = ({ data, type }: Props): JSX.Element => {
  const { setTile, setWallPaper, interiorSelecteIndex } = useServiceStore((state) => state);
  const imgUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

  // 페이지 마운트, 언마운트시 전역데이터 초기화
  useEffect(() => {
    // console.log("페이지 마운트됨");
    setWallPaper("");
    setTile("");
    return () => {
      // console.log("페이지 언마운트됨");
      setWallPaper("");
      setTile("");
    };
  }, []);

  /**
   *
   * @param image "매개변수 'image'는 클릭한 이미지의 경로 또는 식별자를 나타냅니다. 이 함수는 전역 상태 관리를 위해 'zustand'를 사용하여 이미지 값을 저장합니다. 저장된 이미지 값은 왼쪽의 인테리어 비주얼 요소에 표시되도록 설정됩니다."
   */
  const getItemData = (image: string): void => {
    if (type === "wallPaper") {
      setWallPaper(image as "wallPaper");
    }
    if (type === "tile") {
      setTile(image as "tile");
    }
  };

  // type 에 따라 CHECK_DATA의 값이 바뀝니다.
  // 이 값은 벽지 타이틀이름 배열과, 바닥재 타이틀이름 배열입니다.
  const CHECK_DATA = type === "wallPaper" ? tileTextureList : wallPaperTextureList;

  // 클릭시 스위치에서 보내준 값으로 필터를 돌리는 함수입니다.
  // 그 함수는 변수에 저장됩니다. (useState를 사용하면 무한 렌더링에 걸립니다.)
  let filterData: Data[] = [];
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
  let chaingeName: string = "";
  switch (CHECK_DATA[interiorSelecteIndex]) {
    case CHECK_DATA[0]:
      chaingeName = CHECK_DATA[0] === "장판" ? "wallPaper" : "floorMat";
      filterDate(chaingeName);
      break;
    case CHECK_DATA[1]:
      chaingeName = CHECK_DATA[1] === "마루" ? "paint" : "floor";
      filterDate(chaingeName);
      break;
    case CHECK_DATA[2]:
      chaingeName = CHECK_DATA[2] === "데코타일" ? "tile" : "decorationtile";
      filterDate(chaingeName);
      break;
    case CHECK_DATA[3]:
      chaingeName = CHECK_DATA[3] === "포세린" ? "poserin" : "poserin";
      filterDate(chaingeName);
      break;
    default:
      filterData = data;
      break;
  }

  return (
    <>
      {filterData.map((item) => {
        const { id, image } = item;
        return (
          <li
            onClick={() => {
              getItemData(image as "tile" | "wallPaper");
            }}
            key={id}
            className="bg-gray-200 w-[120px] h-[120px] cursor-pointer"
          >
            <img src={`${imgUrl}${image}`} className="w-[120px] h-[120px]" alt={` ${type} 미리보기 이미지`} />
          </li>
        );
      })}
    </>
  );
};
