import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Session } from "@supabase/supabase-js";

export interface Store {
  stayLoggedInStatus: boolean;
  setStayLoggedInStatus: () => void;
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;
}

export const useAuthStore = create<Store>()(
  devtools((set) => ({
    stayLoggedInStatus: false,
    setStayLoggedInStatus: () => {
      set((state) => ({ stayLoggedInStatus: !state.stayLoggedInStatus }));
    },
    currentSession: null,
    setCurrentSession: (session) => {
      set(() => ({ currentSession: session }));
    },
  })),
);

// export const useAuthStore = create<Store>()(devtools(myAuthStore))
