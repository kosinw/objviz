import create from "zustand";
import { persist } from "zustand/middleware";

export type SelectedState = {
  selected: string;
  setSelected: (v: string) => void;
};

export const useSelectedStore = create<SelectedState>(
  persist(
    (set) => ({
      selected: "",
      setSelected: (v: string) => set({ selected: v }),
    }),
    {
      name: "selected",
      getStorage: () => sessionStorage,
    }
  )
);
