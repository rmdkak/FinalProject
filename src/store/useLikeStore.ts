import { create } from "zustand";

interface Store {
  detailPostId: string | undefined;
  setDetailPostId: (paramsId: string | undefined) => void;
  resetDetailPostId: () => void;
}

export const useLikeStore = create<Store>((set) => ({
  detailPostId: undefined,
  setDetailPostId: (paramsId: string | undefined) => {
    set(() => ({ detailPostId: paramsId }));
  },
  resetDetailPostId: () => {
    set(() => ({ detailPostId: undefined }));
  },
}));
