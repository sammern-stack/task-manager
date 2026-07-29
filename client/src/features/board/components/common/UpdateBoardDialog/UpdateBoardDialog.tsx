import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useUpdateBoard } from "../../../hooks/useBoards";
import { Button } from "@/shared/components";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import {
  BoardDialog,
  BoardDialogColumns,
  BoardDialogField,
  BoardDialogForm,
  BoardDialogTitle,
} from "../../shared/BoardDialog";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";

export const UpdateBoardDialog = () => {
  const { getError, setError, clearError } = useBoardError();

  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const { mutate: updateBoard } = useUpdateBoard(openBoard.id ?? "");
  const board = useCurrentBoardStore((s) => s.board);
  const setBoardName = useCurrentBoardStore((s) => s.setBoardName);

  if (!board) return null;

  const handleBoardNameChange = (e: InputChangeEvent) => {
    if (getError("boardName")) clearError("boardName");
    setBoardName(e.target.value);
  };

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data }) => {
          closeDialog();
          addToast({ message, type: "success" });
          setOpenBoardName(data.name);
        },
        onError: ({ message }) => setError("boardName", { message }),
      },
    );
  };

  return (
    <BoardDialog>
      <BoardDialogTitle>Add New Board</BoardDialogTitle>
      <BoardDialogForm variant="update" onUpdate={handleFormSubmit}>
        <BoardDialogField
          id="boardName"
          label="Board Name"
          placeholder="e.g. Web Design"
          error={getError("boardName")}
          handleValue={[board.name, handleBoardNameChange]}
          helperText="Optional - defaults to 'Untitled Board' if empty"
        />
        <BoardDialogColumns id="boardColumns" />
        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </BoardDialogForm>
    </BoardDialog>
  );
};
