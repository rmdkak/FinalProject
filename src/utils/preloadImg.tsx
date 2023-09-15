import { useLayoutEffect } from "react";

export const preloadImg = (src: string) => {
  useLayoutEffect(() => {
    const imgPreload = new Image();
    imgPreload.src = src;
  }, []);
};
