import styles from "./Column.module.scss";
import { Heading } from "@/shared/components";
import type { ColumnSchema } from "@/shared/types/column.types";

interface ColumnProps {
  column: ColumnSchema;
}

export const Column = ({ column: { name } }: ColumnProps) => {
  return (
    <div className={styles.column}>
      <Heading size="h2" className={styles.column__name}>
        {name}
      </Heading>
      <div className={styles.column__tasks}></div>
    </div>
  );
};
