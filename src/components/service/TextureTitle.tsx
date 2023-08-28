import React from "react";

import { useServiceStore } from "store";

interface Props {
  data: string[];
}

const TextureTitle = ({ data }: Props): JSX.Element => {
  const { interiorSelecteIndex, setInteriorSelecteIndex } = useServiceStore((state) => state);

  // 벽지, 타일  세부카테고리 선택시 선택한 아이템의 인덱스를 zustand로 저장하는 함수입니다.
  const onTextureTitleHandler = (index: number) => {
    // 저장된 인덱스 값과 매개변수 인덱스의 값이 다를때 저장합니다.
    if (interiorSelecteIndex !== index) {
      setInteriorSelecteIndex(index);
      return;
    }
    // 저장된값이 기존값과 같으면 -1을 저장합니다.
    setInteriorSelecteIndex(-1);
  };
  // console.log(interiorSelecteIndex);
  return (
    <div className="flex gap-3 mt-10">
      {data.map((item, index) => (
        <span
          onClick={() => {
            onTextureTitleHandler(index);
          }}
          key={item}
          className={` hover:cursor-pointer ${interiorSelecteIndex === index ? "text-[#222]" : ""} `}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default TextureTitle;
