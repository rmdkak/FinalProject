import { useEffect, useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import { GetColor } from "components/colorExtraction";
import { InteriorSection } from "components/service";
import { useInteriorBookmark } from "hooks";
import { useAuthStore, useServiceStore } from "store";

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

  const { wallPaper, tile } = useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();
  const { currentSession } = useAuthStore();
  //  타일 사이즈 컨트롤
  // const [wallPaperSize, setWallPaperSize] = useState<number>(70);
  // const [tileSize, setTileSize] = useState<number>(70);

  useEffect(() => {
    if (wallPaper.right.image !== null) setRightWallPaperBg(`${STORAGE_URL}${wallPaper.right.image ?? ""}`);
    if (wallPaper.left.image !== null) setLeftWallPaperBg(`${STORAGE_URL}${wallPaper.left.image ?? ""}`);
    if (tile.image !== null) setTileBg(`${STORAGE_URL}${tile.image}`);
  }, [wallPaper, tile]);

  const { interiorBookmarkResponse, addInteriorBookmarkMutation, deleteInteriorBookmarkMutation } =
    useInteriorBookmark();
  // TODO IsLoading, IsError 구현하기
  const { data: currentBookmarkData } = interiorBookmarkResponse;

  useEffect(() => {
    if (currentBookmarkData == null) return;
    setIsItemBookmarkedData(currentBookmarkData[0]);
  }, [currentBookmarkData, wallPaper.left.id, wallPaper.right.id, tile.id]);

  return (
    <>
      <div className="m-20 flex-column">
        <h1 className="mb-10 text-3xl font-bold">Interior Design</h1>
        <div className="gap-40 flex-column">
          {/* 벽지/ 타일 비교 박스 */}
          <div className="flex w-full gap-10">
            {/* 왼쪽 인터렉션 박스 */}
            <div className="flex-column contents-center h-[603px] bg-gray03 w-[860px] overflow-hidden">
              <div className="cube">
                {/* 벽지 */}
                <div
                  style={{
                    backgroundImage: `url(${leftWallPaperBg})`,
                    backgroundSize: `${70}px, ${70}px`,
                  }}
                  className="left-wall"
                ></div>
                <div
                  style={{
                    backgroundImage: `url(${RightWallPaperBg})`,
                    backgroundSize: `${70}px, ${70}px`,
                  }}
                  className="right-wall"
                ></div>
                {/* 타일 */}
                <div
                  style={{ backgroundImage: `url(${tileBg})`, backgroundSize: `${70}px, ${70}px` }}
                  className="floor"
                ></div>
              </div>
            </div>

            <div className="flex-column h-[603px] w-[860px] gap-y-40">
              {/* 인테리어 섹션 */}
              <InteriorSection />
              <div>
                <label htmlFor="calc">자재 소모량 계산기</label>
                <button
                  className="h-[24px]"
                  id="calc"
                  onClick={() => {
                    alert("테스트");
                  }}
                >
                  {`>`}
                </button>
                <div className="flex gap-[16px] mt-[24px]">
                  {isItemBookmarkedData != null ? (
                    <BsBookmarkFill
                      className="text-[50px] cursor-pointer"
                      onClick={async () => {
                        if (
                          currentSession === null ||
                          tile.id == null ||
                          wallPaper.left.id == null ||
                          wallPaper.right.id == null
                        )
                          return;
                        deleteInteriorBookmarkMutation.mutate({
                          userId: currentSession.user.id,
                          tileId: tile.id,
                          leftWallpaperId: wallPaper.left.id,
                          rightWallpaperId: wallPaper.right.id,
                        });
                      }}
                    />
                  ) : (
                    <BsBookmark
                      className="text-[50px] cursor-pointer"
                      onClick={async () => {
                        if (
                          currentSession === null ||
                          tile.id == null ||
                          wallPaper.left.id == null ||
                          wallPaper.right.id == null
                        )
                          return;
                        addInteriorBookmarkMutation.mutate({
                          userId: currentSession.user.id,
                          tileId: tile.id,
                          leftWallpaperId: wallPaper.left.id,
                          rightWallpaperId: wallPaper.right.id,
                        });
                      }}
                    />
                  )}
                  <button className="w-[382px] h-[64px] border-[1px] border-black">추천하기</button>
                  <button className="w-[64px] h-[64px] bg-gray-200"></button>
                </div>
              </div>
            </div>
          </div>
          {/* <GetColor leftWall={leftWallPaperBg} rightWall={RightWallPaperBg} /> */}
          <GetColor leftWall={leftWallPaperBg} rightWall={RightWallPaperBg} />
        </div>
      </div>
    </>
  );
};
