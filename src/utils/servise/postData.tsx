import { useLayoutEffect } from "react";

interface Props {
  src: string;
}

export const preloadImg = ({ src }: Props) => {
  useLayoutEffect(() => {
    const imgPreload = new Image();
    imgPreload.src = src;
  }, []);
};
