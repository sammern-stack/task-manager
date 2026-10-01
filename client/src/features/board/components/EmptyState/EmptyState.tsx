import styles from "./EmptyState.module.scss";
import { useEffect, useState } from "react";
import { CreateColumn } from "../CreateColumn/CreateColumn";
import { Button } from "@/shared/components";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";

export const EmptyState = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    return () => setIsCreating(false);
  }, [openBoardId]);

  return (
    <div className={styles.emptyState}>
      {isCreating ? (
        <CreateColumn />
      ) : (
        <div className={styles.emptyState__empty}>
          <p>This board is empty. Create a new column to get started.</p>
          <Button variant="primarySmall" onClick={() => setIsCreating(true)}>
            + Create New Column
          </Button>
        </div>
      )}
    </div>
  );
};
