import create from "zustand";
import { persist } from "zustand/middleware";

import produce from "immer";
import { ImmerSetter } from "./common";

export enum LastConnected {
  Success,
  Failure,
  Indeterminate,
}

export type ConnectPreset = {
  name: string;
  uri: string;
  deleted: boolean;
  lastConnected: LastConnected;
};

export type PresetState = {
  presets: Record<string, ConnectPreset>;
  set: ImmerSetter<PresetState>;
};

export const usePresetStore = create<PresetState>(
  persist(
    (set) => ({
      presets: {},
      set: (fn) => set(produce(fn)),
    }),
    {
      name: "preset-store",
      getStorage: () => localStorage,
    }
  )
);
