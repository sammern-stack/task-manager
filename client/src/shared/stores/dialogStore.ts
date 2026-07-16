import { create } from "zustand";

type Dialog = {
  isOpen: boolean;
  type: DialogType;
  payload: DialogPayload;
};

type DialogType = "createBoard" | null;

type DialogPayload = Record<string, unknown> | null;

const DEFAULT_DIALOG = {
  isOpen: false,
  type: null,
  payload: null,
};

interface DialogStore {
  dialog: Dialog;
  openDialog: (
    type: Exclude<DialogType, null>,
    payload?: DialogPayload,
  ) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: DEFAULT_DIALOG,
  openDialog: (type, payload = null) =>
    set(() => ({
      dialog: { isOpen: true, type, payload },
    })),
  closeDialog: () => set(() => ({ dialog: DEFAULT_DIALOG })),
}));
