import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";
import { ImmerSetter } from "./common";

export type URIState = {
  uri: string | null;
  set: ImmerSetter<URIState>;
};

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
