import styles from "./UpdateBoardDialog.module.scss";
import { useState } from "react";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useUpdateBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";

export const UpdateBoardDialog = () => {
  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const { mutate: updateBoard } = useUpdateBoard(openBoard.id ?? "");
  const [updatedBoard, setUpdatedBoard] = useState(openBoard.name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: updatedBoard },
      {
        onSuccess: (updatedBoard) => {
          closeDialog();
          addToast({
            message: updatedBoard.message,
            type: "success",
          });
          setOpenBoardName(updatedBoard.data.name);
        },
        onError: (error) => setErrorMessage(error.message),
      },
    );
  };

  const handleInputChange = (e: InputChangeEvent) => {
    if (errorMessage) setErrorMessage(null);
    setUpdatedBoard(e.target.value);
  };

  return (
    <div className={styles.createBoardDialog}>
      <h2 className={styles.createBoardDialog__title}>Edit Board</h2>
      <form
        className={styles.createBoardDialog__form}
        onSubmit={handleFormSubmit}
      >
        <label
          htmlFor="boardName"
          className={styles.createBoardDialog__boardNameLabel}
        >
          <span className={styles.createBoardDialog__boardNameLabelText}>
            Board Name
          </span>
          {errorMessage && (
            <span className={styles.createBoardDialog__nameError}>
              {errorMessage}
            </span>
          )}
          <input
            type="text"
            id="boardName"
            name="boardName"
            value={updatedBoard}
            onChange={handleInputChange}
            placeholder="e.g. Web Design"
            autoComplete="off"
            className={[
              styles.createBoardDialog__input,
              errorMessage ? styles["createBoardDialog__input--error"] : "",
            ].join(" ")}
          />
          <span className={styles.createBoardDialog__helperText}>
            Optional - defaults to 'Untitled Board' if empty
          </span>
        </label>

        <Button type="submit" variant="primarySmall">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
