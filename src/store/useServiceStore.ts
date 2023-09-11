import { BG_MAGNIFICATION_LANGTH } from "components";
import { type selectBgSize, type SelectBg, type WallOrTileOrFurniture, type Wallpaper } from "types/service";
import { create } from "zustand";

interface Tile {
  image: string | null;
  id: string | null;
}

interface Store {
  checkType: WallOrTileOrFurniture;
  setTypeCheck: (type: WallOrTileOrFurniture) => void;

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
  wallpaperPaint: { left: string | null; right: string | null };
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
  setClickItemBorder: (id: string, type: boolean, headerTitle: WallOrTileOrFurniture) => void;
  resetClickItemBorder: () => void;

  // 배경 선택
  selectBg: SelectBg;
  setSelectBg: (type: SelectBg) => void;
  selectBgSize: selectBgSize;
  setIncreseSelectBgSize: (type: SelectBg) => void;
  setDecreseSelectBgSize: (type: SelectBg) => void;
}

export const useServiceStore = create<Store>()((set) => ({
  checkType: "wallPaper",
  setTypeCheck: (type) => {
    set((state) => ({ checkType: (state.checkType = type) }));
  },

  // 인테리어 헤더
  interiorSelecteIndex: 0,
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
  wallpaperPaint: { left: null, right: null },
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
    set(() => ({ wallpaperPaint: { left: null, right: null } }));
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
  resetClickItemBorder: () => {
    set(() => ({ onClickItemBorder: { left: "", right: "", tile: "" } }));
  },

  // 배경색 크기 컨트롤러
  selectBg: "leftWall",
  setSelectBg: (type: SelectBg) => {
    set(() => ({ selectBg: type }));
  },
  selectBgSize: { leftWall: 3, rightWall: 3, tile: 3 },
  setIncreseSelectBgSize: (type: SelectBg) => {
    if (type === "leftWall") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.leftWall !== BG_MAGNIFICATION_LANGTH - 1
            ? { ...state.selectBgSize, leftWall: state.selectBgSize.leftWall + 1 }
            : { ...state.selectBgSize, leftWall: BG_MAGNIFICATION_LANGTH - 1 },
      }));
    }
    if (type === "rightWall") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.rightWall !== BG_MAGNIFICATION_LANGTH - 1
            ? { ...state.selectBgSize, rightWall: state.selectBgSize.rightWall + 1 }
            : { ...state.selectBgSize, rightWall: BG_MAGNIFICATION_LANGTH - 1 },
      }));
    }
    if (type === "tile") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.tile !== BG_MAGNIFICATION_LANGTH - 1
            ? { ...state.selectBgSize, tile: state.selectBgSize.tile + 1 }
            : { ...state.selectBgSize, tile: BG_MAGNIFICATION_LANGTH - 1 },
      }));
    }
  },
  setDecreseSelectBgSize: (type: SelectBg) => {
    if (type === "leftWall") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.leftWall !== 0
            ? { ...state.selectBgSize, leftWall: state.selectBgSize.leftWall - 1 }
            : { ...state.selectBgSize, leftWall: 0 },
      }));
    }
    if (type === "rightWall") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.rightWall !== 0
            ? { ...state.selectBgSize, rightWall: state.selectBgSize.rightWall - 1 }
            : { ...state.selectBgSize, rightWall: 0 },
      }));
    }
    if (type === "tile") {
      set((state) => ({
        selectBgSize:
          state.selectBgSize.tile !== 0
            ? { ...state.selectBgSize, tile: state.selectBgSize.tile - 1 }
            : { ...state.selectBgSize, tile: 0 },
      }));
    }
  },
}));
