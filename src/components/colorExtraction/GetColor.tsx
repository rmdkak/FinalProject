import { useState, useEffect } from "react";

import { useColor } from "color-thief-react";
import { type ReducerState, type ColorFormats } from "color-thief-react/lib/types";
import { useDialog } from "components";
import { useServiceStore } from "store";

import { ColorItem } from "./ColorItem";
import { GetColorForm } from "./GetColorForm";

interface props {
  leftWall: string;
  rightWall: string;
}

export const GetColor = ({ leftWall, rightWall }: props) => {
  const [color, setColor] = useState<string>(leftWall);

  const { wallpaperPaint, interiorSelectX } = useServiceStore((state) => state);
  const { Alert } = useDialog();

  const isPaintSeleted = wallpaperPaint.left !== null || wallpaperPaint.right !== null;
  const changeSidePaint = interiorSelectX ? wallpaperPaint.left : wallpaperPaint.right;

  useEffect(() => {
    interiorSelectX ? setColor(leftWall) : setColor(rightWall);
  }, [interiorSelectX, leftWall, rightWall]);

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

  const { data, loading, error } = useColor<ColorFormats, ReducerState<string>>(color, "hex", {
    crossOrigin: "anonymous",
  });

  if (isPaintSeleted && changeSidePaint !== null) {
    return (
      // 페인트가 선택 됐을 경우
      <GetColorForm wallpaperColor={changeSidePaint}>
        <ul className="flex flex-wrap gap-4">
          <li
            onClick={() => {
              handleCopyColorClipBoard(changeSidePaint);
            }}
            className="flex"
          >
            <ColorItem color={changeSidePaint} />
          </li>
        </ul>
      </GetColorForm>
    );
  } else if (!isPaintSeleted && data !== null) {
    if (loading) {
      return (
        // 이미지 클릭시 로딩
        <GetColorForm>
          <ul className="flex flex-wrap gap-4">
            <li className="text-gray02">
              <div className="interior-item skeleton-effect" />
            </li>
          </ul>
        </GetColorForm>
      );
    } else if (data === undefined) {
      return (
        // 선택된 데이터가 없을 경우
        <GetColorForm>
          <ul className="flex flex-wrap gap-4">
            <li className="text-gray02">벽지를 선택해주세요.</li>
          </ul>
        </GetColorForm>
      );
    } else if (error !== undefined) {
      return (
        // 이미지 클릭시 에러의 경우
        <GetColorForm>
          <ul className="flex flex-wrap gap-4">
            <li className="text-gray02">색을 추출하는데 실패했습니다.</li>
          </ul>
        </GetColorForm>
      );
    } else {
      return (
        // 데이터가 뽑혔을 때
        <GetColorForm wallpaperColor={data}>
          <ul className="flex flex-wrap gap-4">
            <li
              onClick={() => {
                handleCopyColorClipBoard(data);
              }}
              className="flex"
            >
              <ColorItem color={data} />
            </li>
          </ul>
        </GetColorForm>
      );
    }
  }
};
