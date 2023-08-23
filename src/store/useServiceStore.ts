import { create } from "zustand";

interface Store {
  checkType: "tile" | "wallPaper";
  setTypeCheck: (type: "tile" | "wallPaper") => void;
  // 인테리어 헤더
  interiorSelecteIndex: number;
  setInteriorSelecteIndex: (index: number) => void;
  // 벽지
  wallPaper: string;
  setWallPaper: (img: string) => void;
  resetWallPaper: () => void;

  // 타일
  tile: string;
  setTile: (img: string) => void;
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
  wallPaper: "",
  setWallPaper: (img) => {
    set((state) => ({ wallPaper: (state.wallPaper = img) }));
  },
  resetWallPaper: () => {
    set(() => ({ wallPaper: "" }));
  },
  // 타일
  tile: "",
  setTile: (img) => {
    set((state) => ({ tile: (state.tile = img) }));
  },
  resetTile: () => {
    set(() => ({ tile: "" }));
  },
}));
