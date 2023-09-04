/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useEffect, useState } from "react";
import { BsShare, BsCalculator } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking from "@egjs/react-flicking";
import calcArrow from "assets/calcArrow.svg";
import {
  GetColor,
  InteriorSection,
  ResouresCalculator,
  Modal,
  useDialog,
  SELECT_CUSTOM_INDEX,
  InteriorBgSizeController,
  BG_DEFAULT_SIZE,
  BG_MAGNIFICATION,
} from "components";
import { useBookmark } from "hooks";
import { useAuthStore, useModalStore, useServiceStore } from "store";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
interface FetchItemBookmark {
  id: string;
  userId: string;
  tileId: string;
  leftWallpaperId: string;
  rightWallpaperId: string;
}

const plugins = [new AutoPlay({ animationDuration: 2000, direction: "NEXT", stopOnHover: false })];

export const Service = () => {
  // 타일/ 벽지를 담는 겟터셋터함수
  const [leftWallPaperBg, setLeftWallPaperBg] = useState<string>("");
  const [RightWallPaperBg, setRightWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");
  const navigate = useNavigate();
  const { Alert, Confirm } = useDialog();

  const { onOpenModal } = useModalStore((state) => state);
  const {
    wallPaper,
    tile,
    wallpaperPaint,
    interiorSelecteIndex,
    resetWallpaperPaint,
    resetWallPaper,
    resetTile,
    resetClickItemBorder,
    selectBgSize,
  } = useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();
  const { currentSession } = useAuthStore();

  const isWallPaperPaintSeleted = wallpaperPaint.left !== null || wallpaperPaint.right !== null;

  const resetState = () => {
    resetWallPaper();
    resetWallpaperPaint();
    resetTile();
    resetClickItemBorder();
  };

  useEffect(() => {
    tile.image !== null ? setTileBg(`${STORAGE_URL}${tile.image}`) : setTileBg("");
    if (isWallPaperPaintSeleted) {
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

  const { bookmarkResponse, addBookmarkMutation, deleteBookmarkMutation } = useBookmark();

  // TODO IsLoading, IsError 구현하기
  const { data: currentBookmarkData } = bookmarkResponse;

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

  const addBookmark = async () => {
    if (currentSession === null) {
      const goToLogin = await Confirm(
        <>
          <p>북마크 기능은 로그인 후 이용가능합니다.</p>
          <p>로그인 하시겠습니까?</p>
        </>,
      );
      if (goToLogin) {
        navigate("/login");
      }
      return;
    }
    if (tile.id === null || wallPaper.left.id === null || wallPaper.right.id === null) {
      await Alert("벽지와 타일 3가지 모두 선택해주세요.");
      return;
    }
    addBookmarkMutation.mutate({
      userId: currentSession.user.id,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    await Alert("조합이 저장되었습니다.");
  };

  const deleteBookmark = async () => {
    if (currentSession === null || tile.id == null || wallPaper.left.id == null || wallPaper.right.id == null) return;
    deleteBookmarkMutation.mutate({
      userId: currentSession.user.id,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    });
    await Alert("조합이 삭제되었습니다.");
  };

  const recommendDesign = async () => {
    if (currentSession === null) {
      const sessionCheck = await Confirm(
        <p>
          해당 서비스는 로그인 후 이용 가능합니다.
          <br />
          로그인 페이지로 이동하시겠습니까?
        </p>,
      );
      if (sessionCheck) navigate("/login");
      return;
    }
    navigate("/post");
  };

  const testArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const LEFT_WALLPAPER_BGSIZE: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.leftWall]) / 100;
  const RIFHT_WALLPAPER_BGSIZE: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.rightWall]) / 100;
  const TILE_BGSIZE: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.tile]) / 100;

  return (
    <>
      <div className="mx-auto flex-column w-[1280px] gap-10">
        <h1 className="mt-20 text-3xl font-bold ">Interior Design</h1>
        <div className="gap-40 flex-column">
          {/* 벽지/ 타일 비교 박스 */}
          <div className="flex w-full gap-20">
            {/* 왼쪽 인터렉션 박스 */}
            <div className="flex flex-none contents-center sticky top-[20%] bg-gray03 w-[600px] h-[400px] overflow-hidden rounded-xl">
              {/* 배경크기 컨트롤 박스 */}
              <InteriorBgSizeController />

              <div className="cube">
                {/* 벽지 */}
                {!isWallPaperPaintSeleted ? (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(${
                          interiorSelecteIndex !== 5 ? leftWallPaperBg : (wallPaper.left.image as string)
                        })`,
                        backgroundSize: `${LEFT_WALLPAPER_BGSIZE}px, ${LEFT_WALLPAPER_BGSIZE}px`,
                      }}
                      className="left-wall"
                    ></div>
                    <div
                      style={{
                        backgroundImage: `url(${
                          interiorSelecteIndex !== 5 ? RightWallPaperBg : (wallPaper.right.image as string)
                        })`,
                        backgroundSize: `${RIFHT_WALLPAPER_BGSIZE}px, ${RIFHT_WALLPAPER_BGSIZE}px`,
                      }}
                      className="right-wall"
                    ></div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        backgroundColor: leftWallPaperBg,
                      }}
                      className="left-wall"
                    ></div>
                    <div
                      style={{
                        backgroundColor: RightWallPaperBg,
                      }}
                      className="right-wall"
                    ></div>
                  </>
                )}
                {/* 타일 */}
                <div
                  style={{
                    backgroundImage: `url(${
                      interiorSelecteIndex !== SELECT_CUSTOM_INDEX ? tileBg : (tile.image as string)
                    })`,
                    backgroundSize: `${TILE_BGSIZE}px, ${TILE_BGSIZE}px`,
                  }}
                  className="floor"
                ></div>
              </div>
            </div>
            <div className="flex-column w-[600px] gap-10">
              {/* 인테리어 섹션 */}
              <InteriorSection onCheckCustom={true} />
              {/* 컬러 추출 */}
              <GetColor leftWall={leftWallPaperBg} rightWall={RightWallPaperBg} />
              <div>
                <div className="flex mb-6">
                  <BsCalculator className="mr-1 translate-y-1 fill-gray02" />
                  <label className="hover:cursor-pointer text-gray02" htmlFor="calc">
                    자재 소모량 계산기
                  </label>
                  <button className="h-6 ml-2" id="calc" onClick={onOpenModal}>
                    <img src={calcArrow} alt="" />
                  </button>
                </div>

                {/* 자재량 소모 계산기 모달 */}
                <Modal title="자재 소모량 계산기">
                  <ResouresCalculator />
                </Modal>

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
                    className="flex-auto h-[64px] border-[1px] rounded-xl border-gray05 outline-button-hover"
                  >
                    추천하기
                  </button>
                  <button className="w-[64px] h-[64px] rounded-xl border-[1px] border-gray05 outline-button-hover">
                    <BsShare className="mx-auto w-7 h-7 fill-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="mt-20 mb-10 text-2xl font-semibold">지금 뜨고있는 베스트조합</h1>
          {/* <div className="flex gap-10 mb-10"> */}
          <Flicking align={"prev"} circular={true} panelsPerView={5} plugins={plugins}>
            {testArr.map((_, idx) => (
              <div key={idx} className="inline-flex mb-24">
                <div className="relative inline-flex w-[220px] h-20 mr-10">
                  <div className="absolute top-0 left-[0px] interior-item bg-gray01"></div>
                  <div className="absolute top-0 left-[70px] interior-item bg-gray02"></div>
                  <div className="absolute top-0 left-[140px] interior-item bg-gray03"></div>
                </div>
              </div>
            ))}
          </Flicking>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
