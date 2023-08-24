import { useEffect } from "react";

import { useServiceStore } from "store";
import { type Tables } from "types/supabase";

import { tailTextureList, wallPaperTextureList } from "./data";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

interface Props {
  data: Array<Tables<"WALLPAPER", "Row">>;
  type: "tile" | "wallPaper";
}

export const ServiceItem = ({ data, type }: Props): JSX.Element => {
  const { resetWallPaper, resetTile, setTile, setWallPaper, interiorSelecteIndex } = useServiceStore((state) => state);

  // 페이지 마운트 되었을때, 언마운트 되었을때
  // 인테리어 비쥬얼에 타일, 벽지 적용한걸 초기화하는 useEffect 입니다.
  useEffect(() => {
    // console.log("페이지 마운트됨");
    resetWallPaper();
    resetTile();
    return () => {
      // console.log("페이지 언마운트됨");
      resetWallPaper();
      resetTile();
    };
  }, []);

  const getItemData = (selectItem: { id: string; image: string }): void => {
    // 클릭한 이미지를 zustand로 전역 관리합니다.
    // 저장된 이미지는 왼쪽 인테리어 비쥬얼에 뿌려주게 됩니다.
    if (type === "wallPaper") {
      setWallPaper(selectItem);
    }
    if (type === "tile") {
      setTile(selectItem);
    }
  };

  // type 에 따라 CHECK_DATA의 값이 바뀝니다.
  // 이 값은 벽지 타이틀이름 배열과, 바닥재 타이틀이름 배열입니다.
  const CHECK_DATA = type === "wallPaper" ? tailTextureList : wallPaperTextureList;

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
              getItemData({ id, image });
            }}
            key={id}
            className="bg-gray-200 w-[120px] h-[120px] cursor-pointer"
          >
            <img src={`${STORAGE_URL}${image}`} className="w-[120px] h-[120px]" alt={` ${type} 미리보기 이미지`} />
          </li>
        );
      })}
    </>
  );
};
