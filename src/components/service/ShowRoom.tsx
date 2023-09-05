interface Props {
  leftWallpaperBg: string;
  rightWallpaperBg: string;
  tileBg: string;
}

export const ShowRoom = (Props: Props) => {
  const { leftWallpaperBg, rightWallpaperBg, tileBg } = Props;
  const leftSize = 300;
  const rightSize = 300;
  const tileSize = 100;
  return (
    <div className="md:max flex flex-none contents-center sticky top-[20%] bg-gray03 w-[860px] h-[603px] overflow-hidden rounded-xl">
      <div className="cube">
        {/* 벽지 */}
        <div
          style={{
            backgroundImage: `url(${leftWallpaperBg})`,
            backgroundSize: `${leftSize}px, ${leftSize}px`,
          }}
          className="left-wall"
        ></div>
        <div
          style={{
            backgroundImage: `url(${rightWallpaperBg})`,
            backgroundSize: `${rightSize}px, ${rightSize}px`,
          }}
          className="right-wall"
        ></div>
        {/* 타일 */}
        <div
          style={{
            backgroundImage: `url(${tileBg})`,
            backgroundSize: `${tileSize}px, ${tileSize}px`,
          }}
          className="floor"
        ></div>
      </div>
    </div>
  );
};
