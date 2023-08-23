import React from "react";
interface Props {
  data: string[];
}

const TextureTitle = ({ data }: Props): JSX.Element => {
  return (
    <>
      {/* props로 받아온값을 map돌려 리턴하는 컴포넌트입니다. */}
      {data.map((item) => (
        <span key={item} className="hover:cursor-pointer">
          {item}
        </span>
      ))}
    </>
  );
};

export default TextureTitle;
