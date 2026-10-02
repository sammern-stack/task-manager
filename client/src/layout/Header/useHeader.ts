import {
  useDeleteBoard,
  useGetColumns,
  useCurrentBoardStore,
  useOpenBoardStore,
} from "@/features/board";
import { useDialogStore, useToastStore } from "@/shared/stores";

export const useHeader = () => {
  const { openDialog, closeDialog } = useDialogStore.getState();
  const boardName = useOpenBoardStore((s) => s.openBoard.name);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumns(openBoardId);
  const { mutate: deleteBoard } = useDeleteBoard();
  const startUpdateBoard = useCurrentBoardStore((s) => s.startUpdateBoard);
  const addToast = useToastStore((s) => s.addToast);

  const onEditBoard = () => {
    startUpdateBoard(boardName, columns);
    openDialog("updateBoard");
  };

  const handleDelete = () => {
    deleteBoard(openBoardId, {
      onSuccess: ({ message }) => {
        addToast({ message, type: "success" });
        closeDialog();
      },
    });
  };

  const onDeleteBoard = async () => {
    const deletePayload = {
      title: "Delete this board?",
      description: `Are you sure you want to delete the "${boardName}" board? This action
          will remove all columns and tasks and cannot be reversed.`,
      onDelete: handleDelete,
    };
    openDialog("deleteBoard", deletePayload);
  };

  return { onEditBoard, onDeleteBoard, boardName };
};
