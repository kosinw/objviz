import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";

export type URIHistoryRecord = string;

type ImmerSetter<T> = (fn: (state: T) => void) => void;

export type URIHistoryState = {
  records: URIHistoryRecord[];
  showFirstTimeModal: boolean;
  set: ImmerSetter<URIHistoryState>;
};

export type URIState = {
  currentRecord: URIHistoryRecord | null;
  set: ImmerSetter<URIState>;
};

export const useURIHistoryStore = create<URIHistoryState>(
  persist(
    (set) => ({
      records: [],
      showFirstTimeModal: true,
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "uri-history",
      getStorage: () => localStorage,
    }
  )
);

export const useURIStore = create<URIState>(
  persist(
    (set) => ({
      currentRecord: null,
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "current-uri",
      getStorage: () => sessionStorage,
    }
  )
);
