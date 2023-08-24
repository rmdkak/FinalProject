import { useCallback, useEffect, useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import { supabase } from "api/supabase";
import { GetColor } from "components/colorExtraction";
import { ServiceItem, tailTextureList, wallPaperTextureList } from "components/service";
import TextureTitle from "components/service/TextureTitle";
import { useAuthStore, useServiceStore } from "store";
import { type Tables } from "types/supabase";

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
interface FetchBookmark {
  id: string;
  userId: string;
  tileId: string;
  wallpaperId: string;
}

export const Service = () => {
  //   const [clickType, setClickType] = useState<"tile" | "wallpaper" | undefined>();

  // 타일/ 벽지를 담는 겟터셋터함수
  const [wallData, setWallData] = useState<Array<Tables<"WALLPAPER", "Row">>>([]);
  const [tileData, setTaleData] = useState<Array<Tables<"TILE", "Row">>>([]);

  const [wallPaperBg, setWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");

  const { wallPaper, tile, checkType, setTypeCheck } = useServiceStore((state) => state);
  const [isBookmarkedData, setIsBookmarkedData] = useState<FetchBookmark>();
  const { currentSession } = useAuthStore();
  //  타일 사이즈 컨트롤
  //   const [wallPaperSize, setWallPaperSize] = useState<number>(70);
  //   const [tileSize, setTileSize] = useState<number>(70);

  const fetchData = useCallback(async () => {
    try {
      const { data: wallPaper } = await supabase.from("WALLPAPER").select("*");
      const { data: tale } = await supabase.from("TILE").select("*");
      setWallData(wallPaper as Array<Tables<"WALLPAPER", "Row">>);
      setTaleData(tale as Array<Tables<"TILE", "Row">>);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //   supabase에서 data정보 가져오기
  useEffect(() => {
    fetchData().catch((error) => error(error));
  }, []);

  useEffect(() => {
    if (wallPaper.image !== null) setWallPaperBg(`${STORAGE_URL}${wallPaper.image}`);
    if (tile.image !== null) setTileBg(`${STORAGE_URL}${tile.image}`);
  }, [wallPaper, tile]);
  //   console.log("wallPaper", wallPaper);
  //   console.log("tile", tile);

  //   사이즈 컨트롤세터함수

  const onClickTypeSwitch = (type: "tile" | "wallPaper") => {
    // console.log(type);
    setTypeCheck(type);
  };

  // 현재 선택한 아이템 북마크 되었다면 가져오기
  const fetchBookmark = async () => {
    if (currentSession === null) return;
    const { data } = await supabase
      .from("ITEM-BOOKMARK")
      .select()
      .eq("tileId", tile.id)
      .eq("wallpaperId", wallPaper.id)
      .eq("userId", currentSession.user.id);

    if (data !== null) {
      setIsBookmarkedData(data[0]);
    }
  };

  useEffect(() => {
    void fetchBookmark();
  }, [currentSession?.user.id, tile.id, wallPaper.id]);

  // 현재 선택된 아이템을 북마크하기
  const onBookmarkPostHandler = async () => {
    console.log("bookmark post");
    // post
    if (currentSession == null) return;
    if (tile.id == null) {
      // TODO Custom alert
      alert("타일을 선택해주세요");
      return;
    }
    if (wallPaper.id == null) {
      alert("벽지를 선택해주세요");
      return;
    }

    const selectedItem = { userId: currentSession.user.id, tileId: tile.id, wallpaperId: wallPaper.id };

    await supabase.from("ITEM-BOOKMARK").insert(selectedItem).select();
  };

  // TODO Optimistic Updates 적용하기
  const onBookmarkDeleteHandler = async (id: string) => {
    console.log("bookmark delete");
    await supabase.from("ITEM-BOOKMARK").delete().eq("id", id);
  };

  return (
    <>
      <div className="flex flex-col m-20">
        <h1 className="mb-10 text-3xl font-bold">Interior Design</h1>
        <div className="flex flex-col gap-40">
          {/* 벽지/ 타일 비교 박스 */}
          <div className="flex w-full gap-10">
            {/* 왼쪽 인터렉션 박스 */}
            <div className=" flex flex-col items-center justify-center h-[603px] bg-[#8A8A8A] w-[860px]">
              <div className="p-10 perspective-750">
                {/* 벽지 */}
                <div
                  style={{
                    backgroundImage: `url(${wallPaperBg})`,
                    backgroundSize: `${70}px, ${70}px`,
                  }}
                  className={`w-[500px] h-[200px] translate-x-[25px] translate-y-[6px] border-b-2 border-[1px] border-black`}
                >
                  벽지벽지
                </div>
                {/* 타일 */}
                <div
                  style={{ backgroundImage: `url(${tileBg})`, backgroundSize: `${70}px, ${70}px` }}
                  className={`w-[550px] h-[200px]  rotate-x-[50deg] -translate-y-[30px] transform-style-3d border-[1px] border-black`}
                >
                  타일타일
                </div>
              </div>
            </div>
            <div className="h-[603px] w-[860px]">
              {/* 타일 헤더 */}
              <div className="flex mb-6 h-[35px] text-gray-300 gap-3">
                <span
                  className={
                    checkType === "wallPaper"
                      ? "border-b-2 border-black hover:cursor-pointer text-black"
                      : "hover:cursor-pointer"
                  }
                  onClick={() => {
                    onClickTypeSwitch("wallPaper");
                  }}
                >
                  벽지
                </span>
                |
                <span
                  className={
                    checkType === "tile"
                      ? "border-b-2 border-black hover:cursor-pointer text-black"
                      : "hover:cursor-pointer"
                  }
                  onClick={() => {
                    onClickTypeSwitch("tile");
                  }}
                >
                  바닥재
                </span>
                {checkType === "wallPaper" ? (
                  <>
                    {/* 벽지 종류 목록 */}
                    <TextureTitle data={tailTextureList} />
                  </>
                ) : checkType === "tile" ? (
                  <>
                    {/* 타일 종류 목록 */}
                    <TextureTitle data={wallPaperTextureList} />
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="h-[392px] mb-10 overflow-auto">
                <ul className="flex flex-wrap w-full gap-x-4 gap-y-4">
                  {checkType === "wallPaper" ? (
                    <ServiceItem type={checkType} data={wallData} />
                  ) : (
                    <ServiceItem type={checkType} data={tileData} />
                  )}

                  {/* <li className="bg-gray-200 w-[120px] h-[120px]"></li> */}
                </ul>
              </div>

              <div>
                <label htmlFor="calc">자재 소모량 계산기</label>
                <button
                  className="h-6"
                  id="calc"
                  onClick={() => {
                    alert("테스트");
                  }}
                >
                  {`>`}
                </button>
                <div className="flex gap-4 mt-6">
                  {/* 현재 로그인 user.id */}
                  {/* === */}
                  {/* 북마크 데이터 테이블에서 가져온 userId 를 조건으로 데이터 GET */}

                  {/* 데이터에서 tileId Find */}
                  {/* === */}
                  {/* 현재 선택한 tileId */}

                  {/* 데이터에서 wallpaperId Find */}
                  {/* === */}
                  {/* 현재 선택한 wallpaperId */}

                  {isBookmarkedData != null ? (
                    <button
                      onClick={async () => {
                        if (currentSession === null) {
                          alert("북마크 기능은 로그인 후 이용가능합니다.");
                        }
                        await onBookmarkDeleteHandler(isBookmarkedData.id);
                      }}
                      // className="bg-[#8A8A8A] w-[382px] h-16 border-[1px] border-black"
                    >
                      <BsBookmarkFill className="text-[50px]" />
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        if (currentSession === null) {
                          alert("북마크 기능은 로그인 후 이용가능합니다.");
                        }
                        await onBookmarkPostHandler();
                      }}
                      // className="bg-[#8A8A8A] w-[382px] h-16 border-[1px] border-black"
                    >
                      <BsBookmark className="text-[50px]" />
                    </button>
                  )}

                  <button className=" w-[382px] h-16 border-[1px] border-black">추천하기</button>
                  <button className="w-16 h-16 bg-gray-200"></button>
                </div>
              </div>
            </div>
          </div>
          <GetColor src={tile.image === null ? null : `${STORAGE_URL}${tile.image}`} />
        </div>
      </div>
    </>
  );
};
