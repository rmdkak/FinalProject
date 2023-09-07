type WallOrTile = "tile" | "wallPaper";
type SelectBg = "leftWall" | "rightWall" | "tile";

interface selectBgSize {
  leftWall: number;
  rightWall: number;
  tile: number;
}
interface CheckBorder {
  left: string;
  right: string;
  tile: string;
}
interface CustomSelf {
  image: string;
  id: string;
}
interface Wallpaper {
  image: string | null;
  id: string | null;
}

interface FetchItemBookmark {
  id: string;
  userId: string;
  tileId: string;
  leftWallpaperId: string;
  rightWallpaperId: string;
}

export type { CustomSelf, FetchItemBookmark, WallOrTile, SelectBg, selectBgSize, Wallpaper, CheckBorder };
