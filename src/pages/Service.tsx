import React, { useEffect, useState } from "react";

import test from "assets/test.jpg";
import { GetColor } from "components/colorExtraction";
import { InteriorSection } from "components/service";
import { useServiceStore } from "store";

export const Service = () => {
  const [wallPaperBg, setWallPaperBg] = useState<string>("");
  const [tileBg, setTileBg] = useState<string>("");

  const { wallPaper, tile } = useServiceStore((state) => state);
  //  타일 사이즈 컨트롤
  //   const [wallPaperSize, setWallPaperSize] = useState<number>(70);
  //   const [tileSize, setTileSize] = useState<number>(70);
  const imgUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

  useEffect(() => {
    setWallPaperBg(imgUrl + wallPaper);
    setTileBg(imgUrl + tile);
  }, [wallPaper, tile]);
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
              {/* 인테리어 헤더, 바디 */}
              <InteriorSection />

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
                  <button className="bg-[#8A8A8A] w-[382px] h-16 border-[1px] border-black">저장하기</button>
                  <button className=" w-[382px] h-16 border-[1px] border-black">추천하기</button>
                  <button className="w-16 h-16 bg-gray-200"></button>
                </div>
              </div>
            </div>
          </div>
          <GetColor src={test} />
        </div>
      </div>
    </>
  );
};
