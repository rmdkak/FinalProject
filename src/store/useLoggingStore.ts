import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface Store {
  stayLoggedInStatus: boolean;
  setStayLoggedInStatus: (boolean: boolean) => void;
}

export const useLoggingStore = create(persist<Store>((set) => ({
  stayLoggedInStatus: false,
  setStayLoggedInStatus: (boolean) => {
    set(() => ({ stayLoggedInStatus: boolean }));
  },
}), { name: "stile-stay-status" }
));
