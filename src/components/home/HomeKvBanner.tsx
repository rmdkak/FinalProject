import { useState, useEffect } from "react";

import img01 from "assets/kv_img01.jpg";
import img01_webp from "assets/kv_img01_webp.webp";
import img02 from "assets/kv_img02.jpg";
import img02_webp from "assets/kv_img02_webp.webp";
import img03 from "assets/kv_img03.jpg";
import img03_webp from "assets/kv_img03_webp.webp";
import { useInteriorPreview } from "hooks/useInteriorPreview";
import { preloadImgs } from "utils/imgPreload";

export const HomeKvBanner = () => {
  const { windowWidth } = useInteriorPreview();
  if (windowWidth === undefined) return <></>;
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

  const bannerWebpArr: string[] = [img01_webp, img02_webp, img03_webp];
  const bannerImgArr: string[] = [img01, img02, img03];
  const imgArray: string[] = [...bannerWebpArr, ...bannerImgArr];

  preloadImgs(imgArray);
  return (
    <>
      {widths.map((widths, idx) => (
        <picture key={idx} className={`${widths} h-[800px] transition-[width] duration-1000 ease-in-out sm:h-[640px]`}>
          <source srcSet={bannerWebpArr[idx]} type="image/webp" />
          <img
            src={bannerImgArr[idx]}
            alt="preview image"
            className="w-full object-cover h-[800px] sm:h-[640px] rounded-xl sm:rounded-none"
          />
        </picture>
      ))}
    </>
  );
};
