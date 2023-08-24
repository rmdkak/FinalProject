import { useColor } from "color-thief-react";
import { type ReducerState, type ColorFormats, type ArrayRGB } from "color-thief-react/lib/types";

import { ColorPallet } from "./ColorPallet";

interface props {
  src: string;
}

export const GetColor = ({ src }: props) => {
  const { data, loading, error } = useColor<ColorFormats, ReducerState<string | ArrayRGB>>(src, "hex");
  /**
   *
   * @param color "이 함수는 클립보드에 색상 값을 복사하는 기능을 제공합니다. 매개변수 'color'에는 복사할 색상 값이 전달되어야 합니다."
   */
  const handleCopyColorClipBoard = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        alert("컬러가 복사되었습니다.");
      })
      .catch((error) => {
        console.error("복사 실패", error);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-20">
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상 코드</h2>
          <ul className="flex flex-wrap gap-4">
            <li className="text-3xl font-bold">색을 추출 중입니다.</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상과 어울리는 추천 조합</h2>
          <ul className="flex flex-wrap gap-4"></ul>
        </div>
      </div>
    );
  } else if (error !== undefined) {
    return (
      <div className="flex flex-col w-full gap-20">
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상 코드</h2>
          <ul className="flex flex-wrap gap-4">
            <li className="text-3xl font-bold">색을 추출하는데 실패했습니다.</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상과 어울리는 추천 조합</h2>
          <ul className="flex flex-wrap gap-4"></ul>
        </div>
      </div>
    );
  } else if (data !== undefined) {
    return (
      <div className="flex flex-col w-full gap-20">
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상 코드</h2>
          <ul className="flex flex-wrap gap-4">
            <li
              onClick={() => {
                handleCopyColorClipBoard(data as string);
              }}
              className="flex"
            >
              <div className="w-32 h-32" style={{ backgroundColor: data as string }} />
              <span className="mt-auto font-bold" style={{ color: data as string }}>
                {data}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-8 text-3xl font-medium">현재 색상과 어울리는 추천 조합</h2>
          <ul className="flex flex-wrap gap-4">
            <ColorPallet color={data} />
          </ul>
        </div>
      </div>
    );
  }
};
