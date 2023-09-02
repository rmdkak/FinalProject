import { useState, useEffect } from "react";

import { useColor } from "color-thief-react";
import { type ReducerState, type ColorFormats, type ArrayRGB } from "color-thief-react/lib/types";
import { useDialog } from "components";
import { useServiceStore } from "store";

import { ColorItem } from "./ColorItem";
import { ColorPallet } from "./ColorPallet";

interface props {
  leftWall: string | null;
  rightWall: string | null;
}

export const GetColor = ({ leftWall, rightWall }: props) => {
  const [color, setColor] = useState<string | null>(leftWall);
  const [colorSide, setColorSide] = useState<boolean>(false);
  const { wallpaperPaint } = useServiceStore((state) => state);
  const isWallPaperPaintSeleted = wallpaperPaint.left !== "" || wallpaperPaint.right !== "";
  const { Alert } = useDialog();

  useEffect(() => {
    colorSide ? setColor(rightWall) : setColor(leftWall);
  }, [colorSide, leftWall, rightWall]);

  if (color === null) {
    return (
      <div className="w-full gap-6 flex-column border-b-[1px] border-gray05">
        <div>
          <h2 className="mb-6 pt-6 text-lg font-medium border-t-[1px] border-gray05">현재 색상 코드</h2>
          <ul className="flex flex-wrap gap-4">
            <li className="text-[30px] font-bold">타일을 선택해주세요.</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-lg font-medium pt-6 border-t-[1px] border-gray05">현재 색상과 어울리는 추천 조합</h2>
          <ul className="flex flex-wrap gap-4"></ul>
        </div>
      </div>
    );
  }

  const { data, loading, error } = useColor<ColorFormats, ReducerState<string | ArrayRGB>>(color, "hex", {
    crossOrigin: "anonymous",
  });
  /**
   * @param color "이 함수는 클립보드에 색상 값을 복사하는 기능을 제공합니다. 매개변수 'color'에는 복사할 색상 값이 전달되어야 합니다."
   */
  const handleCopyColorClipBoard = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(async () => {
        await Alert("컬러가 복사되었습니다.");
      })
      .catch(async (error) => {
        await Alert("복사에 실패했습니다.");
        console.error("복사 실패", error);
      });
  };

  if (isWallPaperPaintSeleted) {
    const paint = colorSide ? wallpaperPaint.right : wallpaperPaint.left;
    return (
      <div className="flex-column w-full gap-6 border-y-[1px] border-gray05">
        <div>
          <div className="flex items-center gap-3 my-6">
            <h2 className="text-lg font-medium">현재 색상 코드</h2>
            <span
              className={
                colorSide
                  ? "text-gray-300 hover:cursor-pointer"
                  : "text-black border-b-2 border-black hover:cursor-pointer"
              }
              onClick={() => {
                setColorSide(false);
              }}
            >
              왼쪽 벽
            </span>
            <span
              className={
                colorSide
                  ? "text-black border-b-2 border-black hover:cursor-pointer"
                  : "text-gray-300 hover:cursor-pointer"
              }
              onClick={() => {
                setColorSide(true);
              }}
            >
              오른쪽 벽
            </span>
          </div>

          <ul className="flex flex-wrap gap-4">
            <li
              onClick={() => {
                handleCopyColorClipBoard(paint);
              }}
              className="flex"
            >
              <div className="interior-item" style={{ backgroundColor: paint }} />
            </li>
          </ul>
        </div>
        <div className="gap-6 mb-6 flex-column">
          <h2 className="text-lg font-medium pt-6 border-t-[1px] border-gray05">현재 색상과 어울리는 추천 조합</h2>
          <ColorPallet color={paint} />
        </div>
      </div>
    );
  } else {
    if (loading) {
      return (
        <div className="w-full gap-6 flex-column border-b-[1px] border-gray05">
          <div>
            <h2 className="mb-6 pt-6 text-lg font-medium border-t-[1px] border-gray05">현재 색상 코드</h2>
            <ul className="flex flex-wrap gap-4">
              <li className="text-xl font-bold">색을 추출 중입니다.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-lg font-medium pt-6 border-t-[1px] border-gray05">
              현재 색상과 어울리는 추천 조합
            </h2>
            <ul className="flex flex-wrap gap-4"></ul>
          </div>
        </div>
      );
    } else if (data === undefined) {
      return (
        <div className="w-full gap-6 flex-column border-b-[1px] border-gray05">
          <div>
            <h2 className="mb-6 pt-6 text-lg font-medium border-t-[1px] border-gray05">현재 색상 코드</h2>
            <ul className="flex flex-wrap gap-4">
              <li className="text-xl font-bold text-gray01">색을 선택해주세요.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-lg font-medium pt-6 border-t-[1px] border-gray05">
              현재 색상과 어울리는 추천 조합
            </h2>
            <ul className="flex flex-wrap gap-4"></ul>
          </div>
        </div>
      );
    } else if (error !== undefined) {
      return (
        <div className="w-full gap-6 flex-column border-b-[1px] border-gray05">
          <div>
            <h2 className="mb-6 pt-6 text-lg font-medium border-t-[1px] border-gray05">현재 색상 코드</h2>
            <ul className="flex flex-wrap gap-4">
              <li className="text-xl font-bold">색을 추출하는데 실패했습니다.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-lg font-medium pt-6 border-t-[1px] border-gray05">
              현재 색상과 어울리는 추천 조합
            </h2>
            <ul className="flex flex-wrap gap-4"></ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-column w-full gap-6 border-y-[1px] border-gray05">
          <div>
            <div className="flex items-center gap-3 my-6">
              <h2 className="text-lg font-medium">현재 색상 코드</h2>
              <span
                className={
                  colorSide
                    ? "text-gray-300 hover:cursor-pointer"
                    : "text-black border-b-2 border-black hover:cursor-pointer"
                }
                onClick={() => {
                  setColorSide(false);
                }}
              >
                왼쪽 벽
              </span>
              <span
                className={
                  colorSide
                    ? "text-black border-b-2 border-black hover:cursor-pointer"
                    : "text-gray-300 hover:cursor-pointer"
                }
                onClick={() => {
                  setColorSide(true);
                }}
              >
                오른쪽 벽
              </span>
            </div>

            <ul className="flex flex-wrap gap-4">
              <li
                onClick={() => {
                  handleCopyColorClipBoard(data as string);
                }}
                className="flex"
              >
                <ColorItem color={data as string} />
              </li>
            </ul>
          </div>
          <div className="gap-6 mb-6 flex-column">
            <h2 className="text-lg font-medium pt-6 border-t-[1px] border-gray05">현재 색상과 어울리는 추천 조합</h2>
            <ColorPallet color={data} />
          </div>
        </div>
      );
    }
  }
};
