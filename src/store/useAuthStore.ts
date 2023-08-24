import { create } from "zustand";

import type { Session } from "@supabase/supabase-js";

export interface Store {
  stayLoggedInStatus: boolean;
  setStayLoggedInStatus: () => void;
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;
  previewProfileUrl: string
  setPreviewProfileUrl: (files: string) => void
}

export const useAuthStore = create<Store>((set) => ({
  stayLoggedInStatus: false,
  setStayLoggedInStatus: () => {
    set((state) => ({ stayLoggedInStatus: !state.stayLoggedInStatus }));
  },
  currentSession: null,
  setCurrentSession: (session) => {
    set(() => ({ currentSession: session }));
  },
  previewProfileUrl: "",
  setPreviewProfileUrl: (files) => {
    set(() => ({ previewProfileUrl: files }))
  }
}),
);
