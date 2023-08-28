import { useCallback, useEffect, useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import { GetColor } from "components/colorExtraction";
import { Modal } from "components/modals";
import { InteriorSection, ResouresCalculator } from "components/service";
import { useInteriorBookmark } from "hooks";
import { useAuthStore, useModalStore, useServiceStore } from "store";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
interface FetchItemBookmark {
  id: string;
  userId: string;
  tileId: string;
  wallpaperId: string;
}

export const Service = () => {
  const [wallPaperBg, setWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");

  const { onOpenModal } = useModalStore((state) => state);
  const { wallPaper, tile } = useServiceStore((state) => state);
  const [isItemBookmarkedData, setIsItemBookmarkedData] = useState<FetchItemBookmark>();
  const { currentSession } = useAuthStore();

  const fetchData = useCallback(async () => {}, []);

  useEffect(() => {
    fetchData().catch((error) => error(error));
  }, []);

  useEffect(() => {
    if (wallPaper.image !== null) setWallPaperBg(`${STORAGE_URL}${wallPaper.image}`);
    if (tile.image !== null) setTileBg(`${STORAGE_URL}${tile.image}`);
  }, [wallPaper, tile]);

  const { interiorBookmarkResponse, addInteriorBookmarkMutation, deleteInteriorBookmarkMutation } =
    useInteriorBookmark();
  const { data: currentBookmarkData } = interiorBookmarkResponse;

  useEffect(() => {
    if (currentBookmarkData == null) return;
    setIsItemBookmarkedData(currentBookmarkData[0]);
  }, [currentBookmarkData, wallPaper.id, tile.id]);

  /**
   * sticky의 필요한 높이값을 저장한 변수입니다.
   * 높이값은 임시로 200vh로 해놨습니다.
   */
  const STICKYHEIGHT: string = "h-[200vh]";

  return (
    <>
      <div className="flex flex-col h-auto m-20">
        <h1 className="mb-10 text-3xl font-bold">Interior Design</h1>
        <div className={`first-line:flex flex-col gap-40`}>
          {/* 벽지/ 타일 비교 박스 */}
          <div className={`flex w-full gap-10 ${STICKYHEIGHT}`}>
            {/* 왼쪽 인터렉션 박스 */}
            <div className="sticky top-[20%] flex flex-col items-center justify-center h-[603px] bg-[#8A8A8A] w-[860px]">
              <div className="p-10 perspective-750">
                {/* 벽지 */}
                <div
                  style={{
                    backgroundImage: `url(${wallPaperBg})`,
                    backgroundSize: `${70}px, ${70}px`,
                  }}
                  className={`w-[500px] h-[200px] bg-white translate-x-[25px] translate-y-[6px] border-b-2 border-[1px] border-black`}
                >
                  벽지벽지
                </div>
                {/* 타일 */}
                <div
                  style={{ backgroundImage: `url(${tileBg})`, backgroundSize: `${70}px, ${70}px` }}
                  className={`w-[550px] h-[200px] bg-white rotate-x-[50deg] -translate-y-[30px] transform-style-3d border-[1px] border-black`}
                >
                  타일타일
                </div>
              </div>
            </div>

            <div className="h-[603px] w-[860px]">
              {/* 인테리어 섹션 */}
              <InteriorSection />

              {/* 자재 소모량 계산기 */}
              <div>
                <label htmlFor="calc">자재 소모량 계산기</label>
                <button className="h-6" id="calc" onClick={onOpenModal}>
                  {`>`}
                </button>

                {/* 자재량 소모 계산기 모달 */}
                <Modal title="자재 소모량 계산기">
                  <ResouresCalculator />
                </Modal>

                <div className="flex gap-4 mt-6">
                  {isItemBookmarkedData != null ? (
                    <BsBookmarkFill
                      className="text-[50px] cursor-pointer"
                      onClick={async () => {
                        if (currentSession === null || tile.id == null || wallPaper.id == null) return;
                        deleteInteriorBookmarkMutation.mutate({
                          userId: currentSession.user.id,
                          tileId: tile.id,
                          wallpaperId: wallPaper.id,
                        });
                      }}
                    />
                  ) : (
                    <BsBookmark
                      className="text-[50px] cursor-pointer"
                      onClick={async () => {
                        if (currentSession === null || tile.id == null || wallPaper.id == null) return;
                        addInteriorBookmarkMutation.mutate({
                          userId: currentSession.user.id,
                          tileId: tile.id,
                          wallpaperId: wallPaper.id,
                        });
                      }}
                    />
                  )}

                  <button className=" w-[382px] h-16 border-[1px] border-black">추천하기</button>
                  <button className="w-16 h-16 bg-gray-200"></button>
                </div>
              </div>
              <GetColor src={tile.image === null ? null : `${STORAGE_URL}${tile.image}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
