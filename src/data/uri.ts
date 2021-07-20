import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";
import { ImmerSetter } from "./common";

export type URIPresetState = {
  uriStore: Record<string, string>;
  showFirstTimeModal: boolean;
  set: ImmerSetter<URIPresetState>;
  addEntry: (key: string, value: string) => void;
};

export type URIState = {
  uri: string | null;
  set: ImmerSetter<URIState>;
};

export const useURIPresetStore = create<URIPresetState>(
  persist(
    (set) => ({
      uriStore: {},
      showFirstTimeModal: true,
      addEntry: (key, value) => {
        set(
          produce((draft) => {
            draft.uriStore[key] = value;
          })
        );
      },
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
