import { useState } from "react";
import toast from "react-simple-toasts";
import uuid from "react-uuid";

import { addTileData, addWallpaperData, uploadTileImageHandler, uploadWallpaperImageHandler } from "api/supabase/admin";
import { Select } from "components";
import { useImageResize } from "hooks/useImageResize";

const DataForm = () => {
  const [selectType, setSelectType] = useState<string | undefined>();
  const [selectTexture, setSelectTexture] = useState<string | undefined>();
  const { resizePixelHandler, imageSizeSaveHandler, resizeFile, imageFile } = useImageResize();
  const UUID = uuid();

  const uploadImgHandler = async () => {
    if (imageFile === null) {
      toast("타일, 벽지를 선택해주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }
    if (selectType === undefined || selectTexture === undefined) {
      toast("타입, 텍스쳐를 선택해주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

    const imgData = {
      category: ["test"],
      id: UUID,
      image: `/${selectType}/${UUID}`,
      texture: selectTexture,
    };

    if (selectType === "tile") {
      try {
        if (imageFile !== null) {
          const resizePixel = await resizePixelHandler(160);
          const resizeImageFile = await resizeFile(imageFile, resizePixel);
          if (resizeImageFile !== undefined) {
            await uploadTileImageHandler({ UUID, postImgFile: resizeImageFile });
            await addTileData(imgData);
            toast("타일 등록 성공", { theme: "warning", zIndex: 9999 });
          }
        }
      } catch (error) {
        toast("타일 등록 실패", { theme: "failure", zIndex: 9999 });
        console.error(error);
      }
    } else {
      try {
        if (imageFile !== null) {
          const resizePixel = await resizePixelHandler(160);
          const resizeImageFile = await resizeFile(imageFile, resizePixel);
          if (resizeImageFile !== undefined) {
            await uploadWallpaperImageHandler({ UUID, postImgFile: resizeImageFile });
            await addWallpaperData(imgData);
            toast("벽지 등록 성공", { theme: "warning", zIndex: 9999 });
          }
        }
      } catch (error) {
        toast("벽지 등록 실패", { theme: "failure", zIndex: 9999 });
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={uploadImgHandler} className="items-start w-full flex-column">
        <div className="flex w-full py-[17px] gap-10 border-y border-gray06">
          <label htmlFor="uploadImg" className="text-sm text-black w-[70px]">
            사진 업로드
          </label>
          <input
            id="uploadImg"
            accept="image/png, image/jpeg, image/gif, image/webp"
            type="file"
            required
            onChange={(e) => {
              imageSizeSaveHandler(e);
            }}
            className="text-sm"
          />
        </div>
        <div className="flex w-full gap-10 py-[17px] items-center">
          <label className="text-sm text-black w-[70px]">타입 선택</label>
          <div className="flex w-[150px]">
            <Select
              option={["tile", "wallpaper"]}
              selectedValue={selectType}
              setSelectedValue={setSelectType}
              selfEnterOption={false}
              placeholder="타입 선택"
            ></Select>
          </div>
          <label className="text-sm text-black w-[70px]">텍스쳐 선택</label>
          <div className="flex w-[150px]">
            <Select
              option={selectType !== "tile" ? ["벽지", "타일", "포세린"] : ["장판", "마루", "포세린", "데코타일"]}
              selectedValue={selectTexture}
              setSelectedValue={setSelectTexture}
              selfEnterOption={false}
              placeholder="텍스처 선택"
            ></Select>
          </div>
        </div>
        <button className="bg-point w-[160px] h-[48px] rounded-[8px] ml-auto mt-5">업로드</button>
      </form>
    </>
  );
};
export default DataForm;
