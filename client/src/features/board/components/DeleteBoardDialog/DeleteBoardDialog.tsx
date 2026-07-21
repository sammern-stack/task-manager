import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useDeleteBoard } from "../../hooks/useBoards";

import {
  ConfirmDialog,
  ConfirmDialogTitle,
  ConfirmDialogDescription,
  ConfirmDialogButtonWrapper,
  ConfirmDialogButton,
} from "@/shared/components/Dialog/ConfirmDialog";

export const DeleteBoardDialog = () => {
  const { mutate: deleteBoard } = useDeleteBoard();
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);

  const handleDelete = () => {
    deleteBoard(openBoardId ?? "", {
      onSuccess: (data) => {
        addToast({ message: data.message, type: "success" });
        closeDialog();
      },
    });
  };

  const handleCancel = () => closeDialog();

  return (
    <ConfirmDialog variant="delete">
      <ConfirmDialogTitle>Delete this board?</ConfirmDialogTitle>
      <ConfirmDialogDescription>
        Are you sure you want to delete the "{openBoardName}" board? This action
        will remove all columns and tasks and cannot be reversed.
      </ConfirmDialogDescription>
      <ConfirmDialogButtonWrapper>
        <ConfirmDialogButton variant="delete" onDelete={handleDelete}>
          Delete
        </ConfirmDialogButton>
        <ConfirmDialogButton variant="cancel" onCancel={handleCancel}>
          Cancel
        </ConfirmDialogButton>
      </ConfirmDialogButtonWrapper>
    </ConfirmDialog>
  );
};
