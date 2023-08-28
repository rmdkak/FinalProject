import { create } from "zustand";

import type { Session } from "@supabase/supabase-js";

export interface Store {
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;
  previewProfileUrl: string
  setPreviewProfileUrl: (files: string) => void
}

export const useAuthStore = create<Store>((set) => ({
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
