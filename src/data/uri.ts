import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";
import { ImmerSetter } from "./common";

export type URIHistoryRecord = string;

export type URIHistoryState = {
  records: URIHistoryRecord[];
  showFirstTimeModal: boolean;
  set: ImmerSetter<URIHistoryState>;
};

export type URIState = {
  currentRecord: string | null;
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
      name: "uri-history-store",
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
      name: "uri-store",
      getStorage: () => sessionStorage,
    }
  )
);
