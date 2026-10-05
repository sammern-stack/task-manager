import type { TaskSchema } from "@/shared/types/task.types";
import styles from "./TaskView.module.scss";

interface TaskViewProps {
  task: TaskSchema;
}

export const TaskView = ({ task }: TaskViewProps) => {
  return <div className={styles.taskView}>{task.name}</div>;
};
