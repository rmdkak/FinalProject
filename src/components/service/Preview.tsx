import { SELECT_CUSTOM_INDEX, InteriorBgSizeController, BG_DEFAULT_SIZE, BG_MAGNIFICATION } from "components";
import { useServiceStore } from "store";

interface Props {
  leftWallPaperBg: string;
  RightWallPaperBg: string;
  tileBg: string;
}

export const Preview = ({ leftWallPaperBg, RightWallPaperBg, tileBg }: Props) => {
  const { wallPaper, tile, wallpaperPaint, interiorSelecteIndex, selectBgSize } = useServiceStore((state) => state);
  const isWallPaperPaintSeleted = wallpaperPaint.left !== null || wallpaperPaint.right !== null;
  console.log(wallPaper);
  const leftWallpaperBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.leftWall]) / 100;
  const rightWallpaperBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.rightWall]) / 100;
  const tileBgsize: number = (BG_DEFAULT_SIZE * BG_MAGNIFICATION[selectBgSize.tile]) / 100;

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
    </div>
  );
};
