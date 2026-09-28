import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useCreateBoard, useCreateColumns } from "../../../hooks/useBoards";
import { Button } from "@/shared/components";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";

import {
  BoardDialog,
  BoardDialogTitle,
  BoardDialogForm,
  BoardDialogField,
  BoardDialogColumns,
} from "../../shared/BoardDialog";

export const CreateBoardDialog = () => {
  const { getError, setError, clearError } = useBoardError();

  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const setBoardName = useCurrentBoardStore((s) => s.setBoardName);

  if (!board) return null;

  const handleBoardNameChange = (e: InputChangeEvent) => {
    if (getError("boardName")) clearError("boardName");
    setBoardName(e.target.value);
  };

  const handleCreateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data }) => {
          const columnsToCreate = board.columns
            .map((col) => col.column.name)
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

          if (columnsToCreate.length > 0) {
            createColumns({ boardId: data._id, columns: columnsToCreate });
          }

          setOpenBoard({ id: data._id, name: data.name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => {
          setError("boardName", { message });
        },
      },
    );
  };

  return (
    <BoardDialog>
      <BoardDialogTitle>Add New Board</BoardDialogTitle>
      <BoardDialogForm variant="create" onCreate={handleCreateBoard}>
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
