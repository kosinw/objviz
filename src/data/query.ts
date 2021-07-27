import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";
import { GetNetworkRequest } from "../api/network";
import { ImmerSetter } from "./common";

export type QueryTree = GetNetworkRequest & {
  prevQuery?: QueryTree;
};

export type QueryState = {
  readonly queries: QueryTree[];
  lastQuery: QueryTree | null;
  set: ImmerSetter<QueryState>;
};

export const useQueryStore = create<QueryState>(
  persist(
    (set, get) => ({
      lastQuery: null,
      set: (fn) => set(produce(fn)),
      get queries() {
        const arr: QueryTree[] = [];
        let ptr = get().lastQuery;

        while (!!ptr) {
          arr.push(ptr);
          ptr = ptr.prevQuery || null;
        }

        return arr;
      },
    }),
    {
      name: "query-store",
      getStorage: () => sessionStorage,
    }
  )
);
