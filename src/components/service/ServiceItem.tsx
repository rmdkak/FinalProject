import React from "react";

import { useServiceStore } from "store";

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

export const ServiceItem = ({ data, type }: Props): JSX.Element => {
  const { setTile, setWallPaper } = useServiceStore((state) => state);
  const imgUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
  const getItemData = (selectItem: { id: string; image: string }): void => {
    if (type === "wallPaper") {
      setWallPaper(selectItem);
    }
    if (type === "tile") {
      setTile(selectItem);
    }
  };

  return (
    <>
      {data.map((item) => {
        const { id, image } = item;
        return (
          <li
            onClick={() => {
              getItemData({ id, image });
            }}
            key={id}
            className="bg-gray-200 w-[120px] h-[120px] cursor-pointer"
          >
            <img src={`${imgUrl}${image}`} alt="미리보기 이미지" />
          </li>
        );
      })}
    </>
  );
};
