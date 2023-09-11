import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Session } from "@supabase/supabase-js";

export interface Store {
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;
  currentUserId: string | undefined;
  setCurrentUserId: (userId: string | undefined) => void;
  previewProfileUrl: string;
  setPreviewProfileUrl: (files: string) => void;
  stayLoggedInStatus: boolean;
  setStayLoggedInStatus: (boolean: boolean) => void;
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      currentSession: null,
      setCurrentSession: (session) => {
        set(() => ({ currentSession: session }));
      },
      currentUserId: undefined,
      setCurrentUserId: (userId) => {
        set(() => ({ currentUserId: userId }));
      },
      previewProfileUrl: "",
      setPreviewProfileUrl: (files) => {
        set(() => ({ previewProfileUrl: files }));
      },
      stayLoggedInStatus: true,
      setStayLoggedInStatus: (boolean) => {
        set(() => ({ stayLoggedInStatus: boolean }));
      },
    }),
    { name: "stile-session-status" },
  ),
);
