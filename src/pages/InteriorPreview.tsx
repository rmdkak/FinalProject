import { useEffect, useState, useCallback } from "react";
import { BsCalculator } from "react-icons/bs";

import { STORAGE_URL } from "api/supabase";
import calcArrow from "assets/svgs/calcArrow.svg";
import share from "assets/svgs/icon_share.svg";
import { GetColor, InteriorSection, ResourcesCalculator, Modal, Preview } from "components";
import { useBookmarkQuery, useBookmark } from "hooks";
import { useModalStore, useServiceStore } from "store";
import { type FetchItemBookmark } from "types/service";

export const InteriorPreview = () => {
  const [leftWallPaperBg, setLeftWallPaperBg] = useState<string>("");
  const [RightWallPaperBg, setRightWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");

  const { onOpenModal } = useModalStore((state) => state);
  const { wallPaper, tile, wallpaperPaint, resetWallPaper, resetWallpaperPaint, resetTile, resetClickItemBorder } =
    useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();

  const { bookmarkResponse } = useBookmarkQuery();
  const { addBookmark, deleteBookmark, recommendDesign } = useBookmark();
  const { data: currentBookmarkData } = bookmarkResponse;

  const resetState = useCallback(() => {
    resetWallPaper();
    resetWallpaperPaint();
    resetTile();
    resetClickItemBorder();
  }, []);

  const isWallPaperPaintSelected = wallpaperPaint.left !== null || wallpaperPaint.right !== null;
  useEffect(() => {
    tile.image !== null ? setTileBg(`${STORAGE_URL}${tile.image}`) : setTileBg("");
    if (isWallPaperPaintSelected) {
      setRightWallPaperBg(wallpaperPaint.right as string);
      setLeftWallPaperBg(wallpaperPaint.left as string);
    } else {
      wallPaper.right.image !== null
        ? setRightWallPaperBg(`${STORAGE_URL}${wallPaper.right.image}`)
        : setRightWallPaperBg("");
      wallPaper.left.image !== null
        ? setLeftWallPaperBg(`${STORAGE_URL}${wallPaper.left.image}`)
        : setLeftWallPaperBg("");
    }
  }, [wallPaper, tile, wallpaperPaint]);

  useEffect(() => {
    if (currentBookmarkData == null) return;
    setIsItemBookmarkedData(currentBookmarkData[0]);
  }, [currentBookmarkData, wallPaper.left.id, wallPaper.right.id, tile.id]);

  useEffect(() => {
    resetState();
    return () => {
      resetState();
    };
  }, []);

  return (
    <div className="mx-auto flex-column w-[1280px] gap-10">
      <h1 className="mt-20 text-3xl font-medium">인테리어 조합</h1>
      <div className="gap-40 flex-column">
        {/* 벽지/ 타일 비교 박스 */}
        <div className="flex w-full gap-20 mb-20">
          {/* 왼쪽 인터렉션 박스 */}
          <Preview leftWallPaperBg={leftWallPaperBg} RightWallPaperBg={RightWallPaperBg} tileBg={tileBg} />
          <div className="flex-column w-[600px] gap-10">
            {/* 인테리어 섹션 */}
            <InteriorSection onCheckCustom={true} />
            {/* 컬러 추출 */}
            <GetColor leftWall={leftWallPaperBg} rightWall={RightWallPaperBg} />
            <div className="flex mb-6">
              <label className="flex hover:cursor-pointer text-gray02" htmlFor="calc">
                <BsCalculator className="mr-1 translate-y-1 fill-gray02" />
                <span>자재 소모량 계산기</span>
              </label>
              <button className="h-6 ml-2" id="calc" onClick={onOpenModal}>
                <img src={calcArrow} alt="" />
              </button>
              <Modal title="자재 소모량 계산기">
                <ResourcesCalculator />
              </Modal>
            </div>
            <div className="flex gap-4 mt-6">
              {isItemBookmarkedData != null ? (
                <button onClick={deleteBookmark} className="flex-auto h-[64px] rounded-xl gray-outline-button">
                  삭제하기
                </button>
              ) : (
                <button onClick={addBookmark} className="flex-auto h-[64px] rounded-xl point-button">
                  저장하기
                </button>
              )}
              <button
                onClick={recommendDesign}
                className="flex-auto h-[64px] border rounded-xl border-gray05 outline-button-hover"
              >
                추천하기
              </button>
              <button className="w-[64px] h-[64px] rounded-xl border border-gray05 outline-button-hover">
                <img src={share} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
