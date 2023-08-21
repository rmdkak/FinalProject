import React, { useState } from "react";

export const Service = () => {
  const [clickType, setClickType] = useState<"tile" | "wallpaper" | undefined>();

  return (
    <>
      <div className="flex flex-col m-20">
        <h1 className="mb-10 text-3xl font-bold">Interior Design</h1>
        <div className="flex flex-col gap-40">
          <div className="flex w-full gap-10">
            <div className="flex flex-col items-center justify-center h-[603px] bg-[#8A8A8A] w-[860px]">
              <div className="p-10 perspective-750">
                <div className="w-[500px] h-[200px] translate-x-[25px] translate-y-[6px] bg-white border-b-2 border-[1px] border-black" />
                <div className="w-[550px] h-[200px] bg-white rotate-x-[50deg] -translate-y-[30px] transform-style-3d text-5xl border-[1px] border-black">
                  {" "}
                  text
                </div>
              </div>
            </div>
            <div className="h-[603px] w-[860px]">
              <div className="flex mb-6 h-[35px] text-gray-300 gap-3">
                <span
                  className={
                    clickType === "tile"
                      ? "border-b-2 border-black hover:cursor-pointer text-black"
                      : "hover:cursor-pointer"
                  }
                  onClick={() => {
                    setClickType("tile");
                  }}
                >
                  벽지
                </span>
                |
                <span
                  className={
                    clickType === "wallpaper"
                      ? "border-b-2 border-black hover:cursor-pointer text-black"
                      : "hover:cursor-pointer"
                  }
                  onClick={() => {
                    setClickType("wallpaper");
                  }}
                >
                  바닥재
                </span>
                {clickType === "wallpaper" ? (
                  <>
                    <span className="hover:cursor-pointer">합판마루</span>
                    <span className="hover:cursor-pointer">강화마루</span>
                    <span className="hover:cursor-pointer">강마루</span>
                    <span className="hover:cursor-pointer">원목마루</span>
                    <span className="hover:cursor-pointer">하이브리드마루</span>
                    <span className="hover:cursor-pointer">시트</span>
                    <span className="hover:cursor-pointer">타일</span>
                    <span className="hover:cursor-pointer">데코타일</span>
                    <span className="hover:cursor-pointer">LVT</span>
                    <span className="hover:cursor-pointer">마모륨</span>
                  </>
                ) : clickType === "tile" ? (
                  <>
                    <span className="hover:cursor-pointer">합지</span>
                    <span className="hover:cursor-pointer">실크</span>
                    <span className="hover:cursor-pointer">발포</span>
                    <span className="hover:cursor-pointer">뮤럴</span>
                    <span className="hover:cursor-pointer">페브릭</span>
                    <span className="hover:cursor-pointer">방염</span>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="h-[392px] mb-10 overflow-auto">
                <ul className="flex flex-wrap w-full gap-x-4 gap-y-4">
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
                  <li className="bg-gray-200 w-[120px] h-[120px]"></li>
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
                  <button className="bg-[#8A8A8A] w-[382px] h-16 border-[1px] border-black">저장하기</button>
                  <button className=" w-[382px] h-16 border-[1px] border-black">추천하기</button>
                  <button className="w-16 h-16 bg-gray-200"></button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-20">
            <div>
              <h2 className="mb-8 text-3xl font-medium">현재 색상 코드</h2>
              <ul className="flex flex-wrap gap-4">
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-8 text-3xl font-medium">현재 색상과 어울리는 추천 조합</h2>
              <ul className="flex flex-wrap gap-4">
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
