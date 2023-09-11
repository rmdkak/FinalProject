import { SELECT_CUSTOM_INDEX, InteriorBgSizeController, BG_DEFAULT_SIZE, BG_MAGNIFICATION } from "components";
import { useServiceStore } from "store";
import { useFurniture } from "store/useFurniture";

interface Props {
  leftWallPaperBg: string;
  RightWallPaperBg: string;
  tileBg: string;
}

export const Preview = ({ leftWallPaperBg, RightWallPaperBg, tileBg }: Props) => {
  const { furnitureState } = useFurniture((state) => state);
  const { wallPaper, tile, wallpaperPaint, interiorSelecteIndex, selectBgSize } = useServiceStore((state) => state);

  const isWallPaperPaintSeleted = wallpaperPaint.left !== null || wallpaperPaint.right !== null;
  const leftWallpaperBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.leftWall]) / 100;
  const rightWallpaperBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.rightWall]) / 100;
  const tileBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.tile]) / 100;

  const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

  return (
    <div className="flex flex-none contents-center sticky top-[20%] bg-gray03 w-[600px] h-[400px] overflow-hidden rounded-xl">
      {/* 배경크기 컨트롤 박스 */}
      <InteriorBgSizeController />

      <div className="cube">
        {/* 벽지 */}
        {!isWallPaperPaintSeleted ? (
          <>
            <div
              style={{
                backgroundImage: `url(${
                  interiorSelecteIndex !== SELECT_CUSTOM_INDEX ? leftWallPaperBg : (wallPaper.left.image as string)
                })`,
                backgroundSize: `${leftWallpaperBgsize}px, ${leftWallpaperBgsize}px`,
              }}
              className="left-wall"
            ></div>
            <div
              style={{
                backgroundImage: `url(${
                  interiorSelecteIndex !== SELECT_CUSTOM_INDEX ? RightWallPaperBg : (wallPaper.right.image as string)
                })`,
                backgroundSize: `${rightWallpaperBgsize}px, ${rightWallpaperBgsize}px`,
              }}
              className="right-wall"
            ></div>
          </>
        ) : (
          <>
            <div
              style={{
                backgroundColor: leftWallPaperBg,
              }}
              className="left-wall"
            ></div>
            <div
              style={{
                backgroundColor: RightWallPaperBg,
              }}
              className="right-wall"
            ></div>
          </>
        )}
        {/* 타일 */}
        <div
          style={{
            backgroundImage: `url(${interiorSelecteIndex !== SELECT_CUSTOM_INDEX ? tileBg : (tile.image as string)})`,
            backgroundSize: `${tileBgsize}px, ${tileBgsize}px`,
          }}
          className="floor"
        ></div>
      </div>
      {/* 시계 */}
      <div
        className={`absolute z-[110] top-[49px]  ${furnitureState.clock.visible ? "visible" : "hidden"} ${
          furnitureState.clock.direction === "left" ? "left-[40px]" : "right-[40px] scale-x-[-1]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.clock.id)} width={49} height={50} alt="가구미리보기 이미지" />
      </div>
      {/* 장 */}
      <div
        className={`absolute z-[100] ${furnitureState.closet.visible ? "visible" : "hidden"} ${
          furnitureState.closet.direction === "left"
            ? "top-[22px] left-[228px] right-0"
            : "top-[150px] right-[0] scale-x-[-1] z-[110]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.closet.id)} width={85} height={192} alt="가구미리보기 이미지" />
      </div>
      {/* 램프1 */}
      <div
        className={`absolute z-[103]  left-0 ${furnitureState.ramp1.visible ? "visible" : "hidden"} ${
          furnitureState.ramp1.direction === "left" ? "top-[137px] left-[0]" : "top-0 left-[300px]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.ramp1.id)} width={85} height={192} alt="가구미리보기 이미지" />
      </div>
      {/* 램프2 */}
      <div
        className={`absolute z-[102]  left-0 ${furnitureState.ramp2.visible ? "visible" : "hidden"} ${
          furnitureState.ramp2.direction === "left"
            ? "top-[198px] left-[11px]"
            : "top-[66px] right-[260px] scale-x-[-1]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.ramp2.id)} width={79} height={116} alt="가구미리보기 이미지" />
      </div>
      {/* 테이블 */}
      <div
        className={`absolute z-[105]  left-[22px] ${furnitureState.table.visible ? "visible" : "hidden"} ${
          furnitureState.table.direction === "left"
            ? "top-[287px] left-[22px]"
            : "top-[177px] right-[264px] scale-x-[-1]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.table.id)} width={79} height={76} alt="가구미리보기 이미지" />
      </div>
      {/* 소파 */}
      <div
        className={`absolute z-[101] top-[101px] left-[44px] ${furnitureState.sopa.visible ? "visible" : "hidden"} ${
          furnitureState.sopa.direction === "left" ? "left-[44px]" : "right-[44px] scale-x-[-1]"
        }`}
      >
        <img src={STORAGE_URL.concat(furnitureState.sopa.id)} width={243} height={216} alt="가구미리보기 이미지" />
      </div>
    </div>
  );
};
