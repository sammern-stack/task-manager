import styles from "./ColumnList.module.scss";
import { Heading } from "@/shared/components";
import type { ColumnSchema } from "@/shared/types/column.types";

interface ColumnListCardProps {
  column: ColumnSchema;
}

export const ColumnListCard = ({ column }: ColumnListCardProps) => {
  return (
    <div className={styles.columnList__column}>
      <Heading size="h2" className={styles.columnList__columnName}>
        {column.name}
      </Heading>
      <div className={styles.columnList__columnTasks}></div>
    </div>
  );
};
