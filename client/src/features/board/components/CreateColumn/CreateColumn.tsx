import styles from "./CreateColumn.module.scss";
import { useEffect, useState } from "react";
import { Heading } from "@/shared/components";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import { CreateColumnForm } from "./CreateColumnForm";

export const CreateColumn = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => setIsCreating(!isCreating);

  useEffect(() => {
    return () => setIsCreating(false);
  }, [openBoardId]);

  return (
    <div className={styles.createColumn}>
      {isCreating ? (
        <CreateColumnForm toggleForm={toggleCreating} />
      ) : (
        <Heading
          size="h1"
          className={styles.createColumn__title}
          onClick={toggleCreating}
        >
          + New Column
        </Heading>
      )}
    </div>
  );
};
