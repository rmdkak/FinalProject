import { useEffect, useState } from "react";
import { BsCalculator } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import calcArrow from "assets/svgs/calcArrow.svg";
import share from "assets/svgs/icon_share.svg";
import { GetColor, InteriorSection, ResouresCalculator, Modal, useDialog, Preview } from "components";
import { useBookmarkQuery } from "hooks";
import { useAuthStore, useModalStore, useServiceStore } from "store";
import { type FetchItemBookmark } from "types/service";

export const InteriorPreview = () => {
  const [leftWallPaperBg, setLeftWallPaperBg] = useState<string>("");
  const [RightWallPaperBg, setRightWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");
  const navigate = useNavigate();
  const { Alert, Confirm } = useDialog();

  const { onOpenModal } = useModalStore((state) => state);
  const { wallPaper, tile, wallpaperPaint, resetWallPaper, resetWallpaperPaint, resetTile, resetClickItemBorder } =
    useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();
  const { currentSession } = useAuthStore();
  const { bookmarkResponse, addBookmarkMutation, deleteBookmarkMutation } = useBookmarkQuery();
  const { data: currentBookmarkData } = bookmarkResponse;

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
    if (tile.id !== null && wallPaper.left.id !== null && wallPaper.right.id !== null) {
      const selectedData = {
        leftWall: { image: wallPaper.left.image, id: wallPaper.left.id },
        rightWall: { image: wallPaper.right.image, id: wallPaper.right.id },
        leftWallPaint: null,
        rightWallPaint: null,
        tile: { image: tile.image, id: tile.id },
      };
      localStorage.setItem("selectedData", JSON.stringify(selectedData));
    } else if (tile.id !== null && wallpaperPaint.left !== null && wallpaperPaint.right !== null) {
      const selectedData = {
        leftWall: null,
        rightWall: null,
        leftWallPaint: wallpaperPaint.left,
        rightWallPaint: wallpaperPaint.right,
        tile: { image: tile.image, id: tile.id },
      };
      localStorage.setItem("selectedData", JSON.stringify(selectedData));
    } else {
      await Alert("조합을 모두 선택하신 후 이용해주세요.");
      return;
    }
    navigate("/post");
  };

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
    </div>
  );
};
