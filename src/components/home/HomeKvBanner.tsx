import { useState, useEffect } from "react";

import img01 from "assets/kv_img01.png";
import img02 from "assets/kv_img02.png";
import img03 from "assets/kv_img03.png";
import { useInteriorPreview } from "hooks/useInteriorPreview";

export const HomeKvBanner = () => {
  const { windowWidth } = useInteriorPreview();
  if (windowWidth === undefined) return;
  const isWindowWidthChange = windowWidth <= 768;
  const initialWidths = windowWidth <= 768 ? ["w-full", "w-0", "w-0"] : ["w-[70%]", "w-[10%]", "w-[10%]"];
  const finalWidth = windowWidth <= 768 ? "w-full" : "w-[70%]";
  const transitionInterval = 3000;

  const [widths, setWidths] = useState<string[]>(initialWidths);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIdx = (currentIdx + 1) % 3;
      const updatedWidths = initialWidths.map((_, index) => {
        if (index === currentIdx) {
          return windowWidth <= 768 ? "w-0" : "w-[10%]";
        } else if (index === nextIdx) {
          return finalWidth;
        } else {
          return windowWidth <= 768 ? "w-0" : "w-[10%]";
        }
      });

      setWidths(updatedWidths);
      setCurrentIdx(nextIdx);
    }, transitionInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIdx, initialWidths]);

  useEffect(() => {
    isWindowWidthChange ? setWidths(["w-full", "w-0", "w-0"]) : setWidths(["w-[70%]", "w-[10%]", "w-[10%]"]);
  }, [isWindowWidthChange]);

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
