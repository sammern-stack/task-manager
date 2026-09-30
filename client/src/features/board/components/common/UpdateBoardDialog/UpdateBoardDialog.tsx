import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useUpdateBoard } from "../../../hooks/useBoards";
import {
  useCreateColumns,
  useUpdateColumns,
  useDeleteColumns,
} from "../../../hooks/useColumns";
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
  const { mutate: updateBoard } = useUpdateBoard(openBoard.id ?? "");
  const { mutate: createColumns } = useCreateColumns();
  const { mutate: updateColumns } = useUpdateColumns();
  const { mutate: deleteColumns } = useDeleteColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const {
    setBoardName,
    buildCreateColumnsArray,
    buildUpdateColumnsArray,
    buildDeleteColumnsArray,
  } = useCurrentBoardStore.getState();

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
          const boardId = data._id;

          const columnsToCreate = buildCreateColumnsArray();
          const columnsToUpdate = buildUpdateColumnsArray();
          const columnsToDelete = buildDeleteColumnsArray();

          if (columnsToCreate)
            createColumns({ boardId, columns: columnsToCreate });

          if (columnsToUpdate)
            updateColumns({ boardId, columns: columnsToUpdate });

          if (columnsToDelete)
            deleteColumns({ boardId, columnIds: columnsToDelete });

          closeDialog();
          addToast({ message, type: "success" });
          setOpenBoard({ name: data.name });
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
        <BoardDialogColumns />
        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </BoardDialogForm>
    </BoardDialog>
  );
};
