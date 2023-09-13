import { STORAGE_URL } from "api/supabase/supabaseClient";

interface Props {
  leftWallpaperBg: string | null | undefined;
  leftWallpaperPaintBg?: string | null | undefined;
  rightWallpaperBg: string | null | undefined;
  rightWallpaperPaintBg?: string | null | undefined;
  tileBg: string | null | undefined;
  page: "detail" | "mypage";
}
const leftSize = 100;
const rightSize = 100;
const tileSize = 100;

export const ShowRoom = (Props: Props) => {
  const { leftWallpaperBg, leftWallpaperPaintBg, rightWallpaperBg, rightWallpaperPaintBg, tileBg, page } = Props;

  const createUrl = (type: "tile" | "wallpaper", interiorId: string) => {
    return `${STORAGE_URL}/${type}/${interiorId}`;
  };

  const size =
    page === "detail"
      ? "w-[500px] h-[400px]"
      : "w-[860px] h-[603px] lg:w-[600px] lg:h-[500px] md:w-[60vw] md:h-[50vh] sm:w-[60vw] sm:h-[50vh]";

  if (
    leftWallpaperBg !== null &&
    leftWallpaperBg !== undefined &&
    rightWallpaperBg !== null &&
    rightWallpaperBg !== undefined &&
    tileBg !== null &&
    tileBg !== undefined
  ) {
    return (
      <div
        className={`md:max flex flex-none contents-center sticky top-[20%] bg-gray03 overflow-hidden rounded-xl ${size}`}
      >
        <div className="cube">
          <div
            style={{
              backgroundImage: `url(${createUrl("wallpaper", leftWallpaperBg)})`,
              backgroundSize: `${leftSize}px, ${leftSize}px`,
            }}
            className="left-wall"
          ></div>
          <div
            style={{
              backgroundImage: `url(${createUrl("wallpaper", rightWallpaperBg)})`,
              backgroundSize: `${rightSize}px, ${rightSize}px`,
            }}
            className="right-wall"
          ></div>
          <div
            style={{
              backgroundImage: `url(${createUrl("tile", tileBg)})`,
              backgroundSize: `${tileSize}px, ${tileSize}px`,
            }}
            className="floor"
          ></div>
        </div>
      </div>
    );
  } else if (
    leftWallpaperPaintBg !== null &&
    leftWallpaperPaintBg !== undefined &&
    rightWallpaperPaintBg !== null &&
    rightWallpaperPaintBg !== undefined &&
    tileBg !== null &&
    tileBg !== undefined
  ) {
    return (
      <div
        className={`md:max flex flex-none contents-center sticky top-[20%] bg-gray03 overflow-hidden rounded-xl ${size}`}
      >
        <div className="cube">
          <div style={{ backgroundColor: `${leftWallpaperPaintBg}` }} className="left-wall"></div>
          <div style={{ backgroundColor: `${rightWallpaperPaintBg}` }} className="right-wall"></div>
          <div
            style={{
              backgroundImage: `url(${createUrl("tile", tileBg)})`,
              backgroundSize: `${tileSize}px, ${tileSize}px`,
            }}
            className="floor"
          ></div>
        </div>
      </div>
    );
  } else return <></>;
};
