import { create } from "zustand";

interface Wallpaper {
  image: string | null;
  id: string | null;
}

interface Tile {
  image: string | null;
  id: string | null;
}
interface Store {
  checkType: "tile" | "wallPaper";
  setTypeCheck: (type: "tile" | "wallPaper") => void;

  // 인테리어 헤더
  interiorSelecteIndex: number;
  setInteriorSelecteIndex: (index: number) => void;

  // 벽지
  wallPaper: { left: Wallpaper; right: Wallpaper };
  setWallPaper: (selectWallpaper: Wallpaper, type: string) => void;
  resetWallPaper: () => void;

  // 타일
  tile: Tile;
  setTile: (selectWallpaper: Tile) => void;
  resetTile: () => void;
}

export const useServiceStore = create<Store>()((set) => ({
  checkType: "wallPaper",
  setTypeCheck: (type) => {
    set((state) => ({ checkType: (state.checkType = type) }));
  },

  // 인테리어 헤더
  interiorSelecteIndex: -1,
  setInteriorSelecteIndex: (index) => {
    set((state) => ({ interiorSelecteIndex: (state.interiorSelecteIndex = index) }));
  },

  //  벽지
  wallPaper: { left: { image: null, id: null }, right: { image: null, id: null } },
  setWallPaper: (selectWallpaper, type) => {
    if (type === "left") {
      set((state) => ({
        wallPaper: { ...state.wallPaper, left: { image: selectWallpaper.image, id: selectWallpaper.id } },
      }));
    } else if (type === "right") {
      set((state) => ({
        wallPaper: { ...state.wallPaper, right: { image: selectWallpaper.image, id: selectWallpaper.id } },
      }));
    }
  },
  resetWallPaper: () => {
    set(() => ({ wallPaper: { left: { image: null, id: null }, right: { image: null, id: null } } }));
  },

  // 타일
  tile: { image: null, id: null },
  setTile: (selectTile) => {
    set(() => ({ tile: { image: selectTile.image, id: selectTile.id } }));
  },
  resetTile: () => {
    set(() => ({ tile: { image: null, id: null } }));
  },
}));
