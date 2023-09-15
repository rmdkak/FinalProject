import { useState, useEffect } from "react";
import toast from "react-simple-toasts";

import { useColor } from "color-thief-react";
import { type ReducerState, type ColorFormats } from "color-thief-react/lib/types";
import { CoachStepThree } from "components/service/coachMark";
import { useServiceStore } from "store";
import { useCoachMarkStore } from "store/useCoachMarkStore";

import { ColorItem } from "./ColorItem";
import { GetColorForm } from "./GetColorForm";

interface props {
  leftWall: string;
  rightWall: string;
}

export const GetColor = ({ leftWall, rightWall }: props) => {
  const [color, setColor] = useState<string>(leftWall);
  const { activeNumber, isTutorialPass } = useCoachMarkStore();
  const { wallpaperPaint, interiorSelectX } = useServiceStore((state) => state);

  const isPaintSelected = wallpaperPaint.left !== null || wallpaperPaint.right !== null;
  const changeSidePaint = interiorSelectX ? wallpaperPaint.left : wallpaperPaint.right;

  const isStepThree = !isTutorialPass && activeNumber === 3;

  useEffect(() => {
    interiorSelectX ? setColor(leftWall) : setColor(rightWall);
  }, [interiorSelectX, leftWall, rightWall]);
  const handleCopyColorClipBoard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast("컬러가 복사되었습니다.", { theme: "warning", position: "top-center" });
    } catch (error) {
      toast("복사에 실패했습니다.", { theme: "failure", position: "top-center" });
      console.error("복사 실패", error);
    }
  };

  const { data, loading, error } = useColor<ColorFormats, ReducerState<string>>(color, "hex", {
    crossOrigin: "anonymous",
  });

  if (isPaintSelected && changeSidePaint !== null) {
    return (
      // 페인트가 선택 됐을 경우
      <GetColorForm wallpaperColor={changeSidePaint}>
        <ul className="flex flex-wrap gap-4">
          <li
            onClick={() => {
              void handleCopyColorClipBoard(changeSidePaint);
            }}
            className="flex"
          >
            <ColorItem color={changeSidePaint} />
          </li>
        </ul>
      </GetColorForm>
    );
  } else if (!isPaintSelected && data !== null) {
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
          <ul className={`flex flex-wrap gap-4 ${isStepThree ? "relative z-[9400]" : ""}`}>
            <li
              onClick={() => {
                void handleCopyColorClipBoard(data);
              }}
              className={`flex ${isStepThree ? "relative" : ""}`}
            >
              {isStepThree && <CoachStepThree />}
              <ColorItem color={data} />
            </li>
          </ul>
        </GetColorForm>
      );
    }
  } else return <></>;
};
