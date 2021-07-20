import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";
import { ImmerSetter } from "./common";

// TODO(kosi): This is deprecated, remove this eventually
export type URIHistoryState = {
  showFirstTimeModal: boolean;
  set: ImmerSetter<URIHistoryState>;
};

export type URIState = {
  uri: string | null;
  set: ImmerSetter<URIState>;
};

export const useURIHistoryStore = create<URIHistoryState>(
  persist(
    (set) => ({
      uriStore: {},
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
      uri: null,
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "uri-store",
      getStorage: () => sessionStorage,
    }
  )
);
