import produce from "immer";
import create from "zustand";
import { ImmerSetter } from "./common";

export type ClientState = {
  sidebarWidth: number;
  topbarHeight: number;
  set: ImmerSetter<ClientState>;
};

export const useClientStore = create<ClientState>((set) => ({
  sidebarWidth: 0,
  sidebarHeight: 0,
  topbarHeight: 0,
  set: (fn) => set(produce(fn)),
}));
