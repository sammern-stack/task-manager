import { create } from "zustand";

type DialogType = "createBoard" | null;
type DialogPayload = Record<string, unknown> | null;

interface DialogStore {
  dialog: {
    isOpen: boolean;
    type: DialogType;
    payload: DialogPayload;
  };

  openDialog: (
    type: Exclude<DialogType, null>,
    payload?: DialogPayload,
  ) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: {
    isOpen: false,
    type: null,
    payload: null,
  },

  openDialog: (type, payload = null) =>
    set(() => ({
      dialog: { isOpen: true, type, payload },
    })),

  closeDialog: () =>
    set(() => ({
      dialog: { isOpen: false, type: null, payload: null },
    })),
}));
