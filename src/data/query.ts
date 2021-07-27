import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";
import { GetNetworkRequest } from "../api/network";
import { ImmerSetter } from "./common";

export type QueryTree = GetNetworkRequest & {
  prevQuery?: QueryTree;
  name?: string;
};

export type QueryState = {
  lastQuery: QueryTree | null;
  set: ImmerSetter<QueryState>;
};

export const useQueryStore = create<QueryState>(
  persist(
    (set, get) => ({
      lastQuery: null,
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "query-store",
      getStorage: () => sessionStorage,
    }
  )
);
