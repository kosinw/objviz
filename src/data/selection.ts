import create from "zustand";
import { persist } from "zustand/middleware";

export type SelectedState = {
  selected: string;
  id: number;
  type: string;
  setSelectedMeta: (id: number, type: string) => void;
  setSelected: (v: string) => void;
  reset: () => void;
};

export const useSelectedStore = create<SelectedState>(
  persist(
    (set) => ({
      selected: "",
      id: -1,
      type: "",
      setSelectedMeta: (id, type) => set({ id, type }),
      setSelected: (v) => set({ selected: v }),
      reset: () => set({ id: -1, type: "", selected: "" }),
    }),
    {
      name: "selected",
      getStorage: () => sessionStorage,
    }
  )
);
