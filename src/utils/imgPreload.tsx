import { useLayoutEffect } from "react";

interface Src {
  src: string;
}
interface SrcArray {
  src: string[];
}

const preloadImg = ({ src }: Src) => {
  useLayoutEffect(() => {
    const imgPreload = new Image();
    imgPreload.src = src;
  }, []);
};
const preloadImgs = ({ src }: SrcArray) => {
  useLayoutEffect(() => {
    src.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);
};

export { preloadImg, preloadImgs };
