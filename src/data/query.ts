import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";
import { GetNetworkRequest } from "../api/network";
import { ImmerSetter } from "./common";

export type QueryState = {
  lastQuery: GetNetworkRequest | null;
  set: ImmerSetter<QueryState>;
};

export const useQueryStore = create<QueryState>(
  persist(
    (set) => ({
      lastQuery: null,
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "query-store",
      getStorage: () => sessionStorage,
    }
  )
);
