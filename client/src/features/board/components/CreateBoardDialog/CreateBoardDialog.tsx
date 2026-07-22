import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard, useCreateColumns } from "../../hooks/useBoards";
import { useBoardDialog } from "../../hooks/useBoardDialog";
import { Button } from "@/shared/components";
import type { FormSubmitEvent } from "@/shared/types/react.types";

import {
  BoardDialog,
  BoardDialogTitle,
  BoardDialogForm,
  BoardDialogField,
  BoardDialogColumns,
} from "../shared/BoardDialog";

export const CreateBoardDialog = () => {
  const { boardColumns, boardName, error, setError, handleInputChange } =
    useBoardDialog("create");

  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  const handleCreateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: boardName },
      {
        onSuccess: ({ message, data }) => {
          const columnsToCreate = boardColumns
            .map((column) => column.name.trim())
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

          if (columnsToCreate.length > 0) {
            createColumns({
              boardId: data._id,
              columns: { columns: columnsToCreate },
            });
          }

          setOpenBoard({ id: data._id, name: data.name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => setError(message),
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
          error={error}
          handleValue={[boardName, handleInputChange]}
          helperText="Optional - defaults to 'Untitled Board' if empty"
        />
        <BoardDialogColumns formVariant="create" id="boardColumns" />
        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </BoardDialogForm>
    </BoardDialog>
  );
};
