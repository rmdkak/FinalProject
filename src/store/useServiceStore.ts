import { create } from "zustand";
type WallOrTile = "tile" | "wallPaper";

export interface Wallpaper {
  image: string | null;
  id: string | null;
}
interface Tile {
  image: string | null;
  id: string | null;
}

interface Store {
  checkType: WallOrTile;
  setTypeCheck: (type: WallOrTile) => void;

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

  // 벽지 페인트
  wallpaperPaint: { left: string; right: string };
  setWallpaperPaint: (selectedPaint: string, type: string) => void;
  resetWallpaperPaint: () => void;

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

  // 아이템클릭 보더
  onClickItemBorder: { left: string; right: string; tile: string };
  setClickItemBorder: (id: string, type: boolean, headerTitle: WallOrTile) => void;
  resetClickItemBordder: () => void;
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

  // 벽지 페인트
  wallpaperPaint: { left: "#f3f3f3", right: "#e5e5e5" },
  setWallpaperPaint: (selectedPaint, type) => {
    if (type === "left") {
      set((state) => ({
        wallpaperPaint: { ...state.wallpaperPaint, left: selectedPaint },
      }));
    } else if (type === "right") {
      set((state) => ({
        wallpaperPaint: { ...state.wallpaperPaint, right: selectedPaint },
      }));
    }
  },
  resetWallpaperPaint: () => {
    set(() => ({ wallpaperPaint: { left: "#f3f3f3", right: "#e5e5e5" } }));
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
    set(() => ({ customSelfWallPaper: [...previewImg] }));
  },
  delCustomSelfWallPaper: (id: string) => {
    set((state) => ({ customSelfWallPaper: state.customSelfWallPaper.filter((item) => item.id !== id) }));
  },
  customSelfTile: [],
  setCustomSelfTile: (previewImg: Tile[]) => {
    set(() => ({ customSelfTile: [...previewImg] }));
  },
  delCustomSelfTile: (id: string) => {
    set((state) => ({ customSelfTile: state.customSelfTile.filter((item) => item.id !== id) }));
  },
  // 아이템클릭 보더
  onClickItemBorder: { left: "", right: "", tile: "" },
  setClickItemBorder: (id, type, headerTitle) => {
    if (type && headerTitle === "wallPaper") {
      set((state) => ({
        onClickItemBorder: { ...state.onClickItemBorder, left: id },
      }));
    } else if (type === (false as boolean) && headerTitle === "wallPaper") {
      set((state) => ({
        onClickItemBorder: { ...state.onClickItemBorder, right: id },
      }));
    } else {
      set((state) => ({
        onClickItemBorder: { ...state.onClickItemBorder, tile: id },
      }));
    }
  },
  resetClickItemBordder: () => {
    set(() => ({ onClickItemBorder: { left: "", right: "", tile: "" } }));
  },
}));
