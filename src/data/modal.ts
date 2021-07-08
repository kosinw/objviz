import produce from "immer";
import React from "react";
import create from "zustand";
import { ImmerSetter } from "./common";

export type ModalState = {
  setWelcomeModalVisible: React.Dispatch<React.SetStateAction<boolean>> | null;
  set: ImmerSetter<ModalState>;
};

export const useModalStore = create<ModalState>((set) => ({
  setWelcomeModalVisible: null,
  set: (fn) => set(produce(fn)),
}));
