import { useServiceStore } from "store";

import { ColorPallet } from "./ColorPallet";

interface Props {
  children: React.ReactNode;
  wallpaperColor?: string | null;
}

export const GetColorForm = ({ wallpaperColor, children }: Props) => {
  const { interiorSelectX, setLeftInteriorSelectX, setRightInteriorSelectX } = useServiceStore((state) => state);

  /**
   * @param color "이 함수는 클립보드에 색상 값을 복사하는 기능을 제공합니다. 매개변수 'color'에는 복사할 색상 값이 전달되어야 합니다."
   */

  if (wallpaperColor !== null)
    return (
      <div className="flex-column w-full gap-6 border-y-[1px] border-gray05">
        <div>
          <div className="flex items-center gap-3 my-6">
            <h2 className="text-lg font-medium">현재 색상 코드</h2>
            <span
              className={interiorSelectX ? "selected-wall-point" : "text-gray03 hover:cursor-pointer"}
              onClick={() => {
                setLeftInteriorSelectX();
              }}
            >
              좌측 벽
            </span>
            <span
              className={interiorSelectX ? "text-gray-03 hover:cursor-pointer" : "selected-wall-point"}
              onClick={() => {
                setRightInteriorSelectX();
              }}
            >
              우측 벽
            </span>
          </div>
          {children}
        </div>
        <div className="gap-6 mb-6 flex-column">
          <h2 className="text-lg font-medium pt-6 border-t-[1px] border-gray05">현재 색상과 어울리는 추천 조합</h2>
          {wallpaperColor !== undefined ? <ColorPallet color={wallpaperColor} /> : <></>}
        </div>
      </div>
    );
};
