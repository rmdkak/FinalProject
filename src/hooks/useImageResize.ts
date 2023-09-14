import type React from "react";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

import { useDialog } from "components";

interface ResizePixelType {
  width: number;
  height: number;
}
export const useImageResize = () => {
  const [imagePixel, setImagePixel] = useState<ResizePixelType>({ width: 0, height: 0 });
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const { Alert } = useDialog();

  const resizeFile = async (file: Blob, resizePixel: ResizePixelType) => {
    const fileExtension = file?.type;
    if (fileExtension === undefined) return;
    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!allowedExtensions.includes(fileExtension)) {
      await Alert("이미지 파일(.png, .jpeg, .jpg, .gif)만 업로드 가능합니다.");
      return;
    }

    return await new Promise<Blob>((resolve) => {
      Resizer.imageFileResizer(
        file,
        resizePixel.width,
        resizePixel.height,
        fileExtension === "image/png" ? "PNG" : "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri as Blob);
        },
        "blob",
      );
    });
  };

  const resizePixelHandler = async (fixedValue: number) => {
    const resizePixel: ResizePixelType = { width: 0, height: 0 };

    const maxValue = Math.max(imagePixel.width, imagePixel.height);
    const radio = maxValue / fixedValue;
    if (maxValue <= fixedValue) {
      resizePixel.width = imagePixel.width;
      resizePixel.height = imagePixel.height;
    } else {
      resizePixel.width = imagePixel.width / radio;
      resizePixel.height = imagePixel.height / radio;
    }
    return resizePixel;
  };

  const imageSizeSaveHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const img = new Image();
    setImageFile(file);
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImagePixel({ width: img.width, height: img.height });
    };
  };

  return { resizeFile, resizePixelHandler, imageSizeSaveHandler, setImagePixel, imagePixel, imageFile, setImageFile };
};
