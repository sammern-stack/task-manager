import styles from "./EmptyState.module.scss";
import { Button } from "@/shared/components";

interface EmptyStateProps {
  onCreate: () => void;
}

export const EmptyState = ({ onCreate }: EmptyStateProps) => {
  return (
    <div className={styles.empty}>
      <p>This board is empty. Create a new column to get started.</p>
      <Button variant="primarySmall" onClick={onCreate}>
        + Create New Column
      </Button>
    </div>
  );
};
