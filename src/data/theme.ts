import create from "zustand";
import { persist } from "zustand/middleware";

export type ThemeState = {
  theme: string;
  set: (v: string) => void;
};

export const useThemeStore = create<ThemeState>(
  persist(
    (set) => ({
      theme: "dark",
      set: (v) => set({ theme: v }),
    }),
    {
      name: "theme-store",
      getStorage: () => localStorage,
    }
  )
);
