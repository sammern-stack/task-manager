import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useUpdateBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";
import type { FormSubmitEvent } from "@/shared/types/react.types";
import { useBoardDialog } from "../../hooks/useBoardDialog";
import {
  BoardDialog,
  BoardDialogColumns,
  BoardDialogField,
  BoardDialogForm,
  BoardDialogTitle,
} from "../shared/BoardDialog";

export const UpdateBoardDialog = () => {
  const { boardName, error, setError, handleInputChange } =
    useBoardDialog("update");

  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const { mutate: updateBoard } = useUpdateBoard(openBoard.id ?? "");

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: boardName },
      {
        onSuccess: ({ message, data }) => {
          closeDialog();
          addToast({ message, type: "success" });
          setOpenBoardName(data.name);
        },
        onError: ({ message }) => setError(message),
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
          error={error}
          handleValue={[boardName, handleInputChange]}
          helperText="Optional - defaults to 'Untitled Board' if empty"
        />
        <BoardDialogColumns formVariant="update" id="boardColumns" />
        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </BoardDialogForm>
    </BoardDialog>
  );
};
