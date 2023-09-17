import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
  isTutorialPass: boolean;
  setTutorialPass: () => void;
  activeNumber: number;
  nextActiveNumber: () => void;
}

export const useCoachMarkStore = create(
  persist<Store>(
    (set, get) => ({
      isTutorialPass: false,
      setTutorialPass: () => {
        set({ isTutorialPass: true });
      },
      activeNumber: 1,
      nextActiveNumber: () => {
        set({ activeNumber: get().activeNumber + 1 });
      },
    }),
    { name: "stile-coach-mark" },
  ),
);
