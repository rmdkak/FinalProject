import { useEffect, useState } from "react";
import { BsShare, BsCalculator } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import calcArrow from "assets/calcArrow.svg";
import { GetColor, InteriorSection, ResouresCalculator, Modal, useDialog } from "components";
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

export const Service = () => {
  // 타일/ 벽지를 담는 겟터셋터함수
  const [leftWallPaperBg, setLeftWallPaperBg] = useState<string>("");
  const [RightWallPaperBg, setRightWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");
  const navigate = useNavigate();
  const { Alert, Confirm } = useDialog();

  const { onOpenModal } = useModalStore((state) => state);
  const { wallPaper, tile, wallpaperPaint, interiorSelecteIndex } = useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();
  const { currentSession } = useAuthStore();

  //  타일 사이즈 컨트롤
  // const [wallPaperSize, setWallPaperSize] = useState<number>(70);
  // const [tileSize, setTileSize] = useState<number>(70);

  const isWallPaperPaintSeleted = wallpaperPaint.left !== "" || wallpaperPaint.right !== "";

  useEffect(() => {
    tile.image !== null ? setTileBg(`${STORAGE_URL}${tile.image}`) : setTileBg("");
    if (isWallPaperPaintSeleted) {
      setRightWallPaperBg(wallpaperPaint.right);
      setLeftWallPaperBg(wallpaperPaint.left);
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

  return (
    <>
      <div className="m-20 flex-column">
        <h1 className="mb-10 text-3xl font-bold">Interior Design</h1>
        <div className="gap-40 flex-column">
          {/* 벽지/ 타일 비교 박스 */}
          <div className="flex w-full gap-10">
            {/* 왼쪽 인터렉션 박스 */}
            <div className="flex flex-none contents-center sticky top-[20%] bg-gray03 w-[860px] h-[603px] overflow-hidden rounded-xl">
              <div className="cube">
                {/* 벽지 */}
                {!isWallPaperPaintSeleted ? (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(${
                          interiorSelecteIndex !== 5 ? leftWallPaperBg : (wallPaper.left.image as string)
                        })`,
                        backgroundSize: `${70}px, ${70}px`,
                      }}
                      className="left-wall"
                    ></div>
                    <div
                      style={{
                        backgroundImage: `url(${
                          interiorSelecteIndex !== 5 ? RightWallPaperBg : (wallPaper.right.image as string)
                        })`,
                        backgroundSize: `${70}px, ${70}px`,
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
                    backgroundImage: `url(${interiorSelecteIndex !== 4 ? tileBg : (tile.image as string)})`,
                    backgroundSize: `${70}px, ${70}px`,
                  }}
                  className="floor"
                ></div>
              </div>
            </div>

            <div className="flex-column w-[860px] gap-10">
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
                  <button className="h-[24px] ml-2" id="calc" onClick={onOpenModal}>
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
        <h1 className="static bottom-0 left-0 mt-20 mb-10 text-2xl font-semibold">가장 인기있는 조합</h1>
        <div className="w-full overflow-x-scroll">
          <div className="mb-20 flex-column">
            <ul className="flex">
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
              <li className="flex">
                <div className="best-colors-item-back"></div>
                <div className="best-colors-item-front"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
