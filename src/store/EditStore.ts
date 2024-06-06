import { create } from "zustand";

export enum EditMode {
  Text = "text",
  Rectangle = "rectangle",
  Arrow = "arrow",
}

interface EditState {
  editMode: EditMode | null;
  downloadImg: boolean;
  setEditMode: (mode: EditMode | null) => void;
  setDownloadImg: (download: boolean) => void;
}

export const useEditStore = create<EditState>((set) => ({
  editMode: null,
  downloadImg: false,
  setEditMode(mode) {
    set({ editMode: mode });
  },
  setDownloadImg(download) {
    set({ downloadImg: download });
  },
}));
