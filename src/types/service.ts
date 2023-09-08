type WallOrTileOrFurniture = "tile" | "wallPaper" | "furniture";
type SelectBg = "leftWall" | "rightWall" | "tile";
type LeftorRight = "left" | "right";

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

interface FurnitureState {
  sopa: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
  closet: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
  ramp1: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
  ramp2: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
  table: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
  clock: {
    visible: boolean;
    id: string;
    direction: "left" | "right";
  };
}

export type {
  CustomSelf,
  LeftorRight,
  FetchItemBookmark,
  WallOrTileOrFurniture,
  SelectBg,
  selectBgSize,
  Wallpaper,
  CheckBorder,
  FurnitureState,
};
