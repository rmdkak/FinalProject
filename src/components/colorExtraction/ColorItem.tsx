import React, { useState } from "react";

import tinycolor from "tinycolor2";

interface Props {
  color: string;
}

export const ColorItem = ({ color }: Props): JSX.Element => {
  const isColorLight = tinycolor(color).isLight();

  const [mouseHover, setMouseHover] = useState<boolean>(false);
  return (
    <>
      <div
        className={`relative flex justify-center items-center cursor-pointer interior-item hover:after:content-[''] hover:after:block hover:after:absolute hover:after:top-0 hover:after:left-0 hover:after:w-full hover:after:h-full hover:after:bg-white hover:after:opacity-[0.2] after:transition-all transition-all`}
        style={{ backgroundColor: color }}
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseOut={() => {
          setMouseHover(false);
        }}
      >
        {mouseHover && <p className={isColorLight ? "text-black" : "text-white"}>{color}</p>}
      </div>
    </>
  );
};
