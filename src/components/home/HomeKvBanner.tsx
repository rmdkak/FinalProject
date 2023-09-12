import { useState, useEffect } from "react";

import img01 from "assets/kv_img01.png";
import img02 from "assets/kv_img02.png";
import img03 from "assets/kv_img03.png";

export const HomeKvBanner = () => {
  const initialWidths = ["w-[70%]", "w-[10%]", "w-[10%]"];
  const finalWidth = "w-[70%]";
  const transitionInterval = 3000;

  const [widths, setWidths] = useState<string[]>(initialWidths);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIdx = (currentIdx + 1) % 3;
      const updatedWidths = initialWidths.map((_, index) => {
        if (index === currentIdx) {
          return "w-[10%]";
        } else if (index === nextIdx) {
          return finalWidth;
        } else {
          return "w-[10%]";
        }
      });

      setWidths(updatedWidths);
      setCurrentIdx(nextIdx);
    }, transitionInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIdx, initialWidths]);

  const VannerImgs = [img01, img02, img03];
  return (
    <>
      {widths.map((widths, idx) => (
        <img
          key={idx}
          src={VannerImgs[idx]}
          alt="preview image"
          className={`${widths} h-[800px] rounded-xl object-cover transition-[width] duration-1000 ease-in-out sm:h-[640px] sm:rounded-none`}
        />
      ))}
    </>
  );
};
