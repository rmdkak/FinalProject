import { useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import photoImage from "assets/svgs/photoImage.svg";
import { useServiceStore } from "store";
import { type Wallpaper } from "types/service";

import { SelfItem } from "./SelfItem";

export const SelfPattern = (): JSX.Element => {
  const InputRef = useRef<HTMLInputElement>(null);
  const IdRef = useRef(0);

  const {
    checkType,
    resetWallpaperPaint,
    setCustomSelfWallPaper,
    setCustomSelfTile,
    customSelfWallPaper,
    customSelfTile,
  } = useServiceStore((state) => state);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const URL_IMG_PATH: Wallpaper[] = acceptedFiles.map((imgFile) => {
        return {
          image: URL.createObjectURL(imgFile),
          id: `${URL.createObjectURL(imgFile)} ${++IdRef.current}`,
        };
      });

      if (checkType === "wallPaper") {
        setCustomSelfWallPaper([...customSelfWallPaper, ...URL_IMG_PATH]);
        return;
      }

      if (checkType === "tile") {
        setCustomSelfTile([...customSelfTile, ...URL_IMG_PATH]);
      }
    },
    [customSelfWallPaper, customSelfTile, setCustomSelfWallPaper, setCustomSelfTile, checkType],
  );

  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, onDrop });

  useEffect(() => {
    resetWallpaperPaint();
  }, []);
  return (
    <>
      <input type="file" accept="image/*" ref={InputRef} {...getInputProps()} />

      <div
        {...getRootProps()}
        className="w-[99%] mx-auto cursor-pointer flex-column contents-center text-center border-dashed h-[100px] box-border opacity-80 hover:opacity-100 transition-all"
      >
        <img src={photoImage} alt="사진모양 이미지" />
        <p>이미지를 드래그 & 드롭</p>
        <p>또는 클릭</p>
      </div>

      {checkType === "wallPaper"
        ? customSelfWallPaper.map((item: Wallpaper) => {
            return <SelfItem key={item.id} item={item} />;
          })
        : customSelfTile.map((item: Wallpaper) => {
            return <SelfItem key={item.id} item={item} />;
          })}
    </>
  );
};
