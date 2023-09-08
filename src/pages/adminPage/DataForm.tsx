import { useState } from "react";
import uuid from "react-uuid";

import { uploadTileImageHandler, uploadWallpaperImageHandler, addTileData, addWallpaperData } from "api/supabase";
import { Select, useDialog } from "components";

export const DataForm = () => {
  const [newImg, setNewImg] = useState<Blob | null>();
  const [selectType, setSelectType] = useState<string | undefined>("TILE");
  const [selectTexture, setSelectTexture] = useState<string | undefined>("");

  const { Alert } = useDialog();
  const UUID = uuid();

  const uploadImgHandler = async () => {
    if (newImg === null || newImg === undefined || selectTexture === undefined || selectType === undefined) {
      void Alert("파일을 선택해주세요.");
      return;
    }

    const imgData = {
      category: [],
      id: UUID,
      image: `/${selectType}/${UUID}`,
      texture: selectTexture,
    };

    if (selectType === "tile") {
      try {
        await uploadTileImageHandler({ UUID, postImgFile: newImg });
        await addTileData(imgData);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await uploadWallpaperImageHandler({ UUID, postImgFile: newImg });
        await addWallpaperData(imgData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="items-center gap-10 flex-column">
        <label
          htmlFor="uploadImg"
          className="px-10 py-6 border rounded-lg border-gray05 text-gray03 hover:cursor-pointer"
        >
          사진 업로드
        </label>
        <input
          id="uploadImg"
          type="file"
          required
          onChange={(e) => {
            if (e.target.files !== null) {
              setNewImg(e.target.files[0]);
            }
          }}
          className="hidden"
        />
        <div className="flex gap-10">
          <div className="flex w-[150px]">
            <Select
              option={["tile", "wallpaper"]}
              selectedValue={selectType}
              setSelectedValue={setSelectType}
              selfEnterOption={false}
            ></Select>
          </div>
          <div className="flex w-[150px]">
            <Select
              option={selectType !== "tile" ? ["장판", "마루", "포세린", "데코타일"] : ["벽지", "타일", "포세린"]}
              selectedValue={selectTexture}
              setSelectedValue={setSelectTexture}
              selfEnterOption={false}
            ></Select>
          </div>
        </div>
        <button className="px-10 py-2 font-medium text-black rounded-lg bg-point" onClick={uploadImgHandler}>
          업로드
        </button>
      </div>
    </>
  );
};
