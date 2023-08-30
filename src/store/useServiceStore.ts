import { create } from "zustand";

export interface Wallpaper {
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
  /** true = left, false right */
  interiorSelectX: boolean;
  setLeftInteriorSelectX: () => void;
  setRightInteriorSelectX: () => void;
  // 벽지
  wallPaper: { left: Wallpaper; right: Wallpaper };
  setWallPaper: (selectWallpaper: Wallpaper, type: string) => void;
  resetWallPaper: () => void;

  // 타일
  tile: Tile;
  setTile: (selectWallpaper: Tile) => void;
  resetTile: () => void;

  // 셀프조합
  customSelfWallPaper: Wallpaper[];
  setCustomSelfWallPaper: (previewImg: Wallpaper[]) => void;
  delCustomSelfWallPaper: (id: string) => void;
  customSelfTile: Tile[];
  setCustomSelfTile: (previewImg: Tile[]) => void;
  delCustomSelfTile: (id: string) => void;
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
  interiorSelectX: true,
  setLeftInteriorSelectX: () => {
    set(() => ({ interiorSelectX: true }));
  },
  setRightInteriorSelectX: () => {
    set(() => ({ interiorSelectX: false }));
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

  // 커스텀셀프이미지
  customSelfWallPaper: [],
  setCustomSelfWallPaper: (previewImg: Wallpaper[]) => {
    set((state) => ({ customSelfWallPaper: [...state.customSelfWallPaper, ...previewImg] }));
  },
  delCustomSelfWallPaper: (id: string) => {
    set((state) => ({ customSelfWallPaper: state.customSelfWallPaper.filter((item) => item.id !== id) }));
  },
  customSelfTile: [],
  setCustomSelfTile: (previewImg: Tile[]) => {
    set((state) => ({ customSelfTile: [...state.customSelfTile, ...previewImg] }));
  },
  delCustomSelfTile: (id: string) => {
    set((state) => ({ customSelfTile: state.customSelfTile.filter((item) => item.id !== id) }));
  },
}));
