import { create } from "zustand";

export enum EditMode {
  Text = "text",
  Rectangle = "rectangle",
  Arrow = "arrow",
}

interface EditState {
  editMode: EditMode | null;
  setEditMode: (mode: EditMode | null) => void;
}

export const useEditStore = create<EditState>((set) => ({
  editMode: EditMode.Arrow,
  setEditMode(mode) {
    set({ editMode: mode });
  },
}));
