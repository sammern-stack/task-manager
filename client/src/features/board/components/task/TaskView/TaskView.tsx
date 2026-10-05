import styles from "./TaskView.module.scss";
import { useDropdown } from "@/shared/hooks/useDropdown";
import { Map } from "@/shared/components";
import { useToggleSubtask } from "@/features/board/hooks/api/useSubtasks";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";
import { useDeleteTask, useGetTask } from "@/features/board/hooks/api/useTasks";
import type { ColumnSchema } from "@/shared/types/column.types";
import { cls } from "@/shared/utils/formatters";
import { useDialogStore } from "@/shared/stores";
import { useTaskFormStore } from "@/features/board/stores/taskFormStore";

interface TaskViewProps {
  taskId: string;
  column: ColumnSchema;
}

export const TaskView = ({ taskId, column }: TaskViewProps) => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { mutate: toggleSubtask } = useToggleSubtask();
  const boardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: selectedTask } = useGetTask(boardId, taskId);
  const { openDialog, closeDialog } = useDialogStore.getState();
  const startUpdateTask = useTaskFormStore((s) => s.startUpdateTask);
  const { mutate: deleteTask } = useDeleteTask(boardId);

  if (!selectedTask) return;

  const completedSubtasks = selectedTask.subtasks.filter(
    (sub) => sub.isCompleted,
  ).length;

  const onEditTask = () => {
    startUpdateTask(
      selectedTask.name,
      selectedTask.description,
      selectedTask.subtasks,
      selectedTask.columnId,
    );
    openDialog("updateTask", { taskId });
  };

  const onDeleteTask = () =>
    openDialog("deleteTask", {
      title: "Delete this task?",
      description:
        "Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.",
      onDelete: () => {
        deleteTask(taskId);
        closeDialog();
      },
    });

  const onToggleSubtask = (subtaskId: string) => {
    toggleSubtask({
      boardId,
      columnId: column._id,
      taskId: selectedTask._id,
      subtaskId,
    });
  };

  return (
    <div className={styles.taskView}>
      <div className={styles.taskView__header}>
        <h2 className={styles.taskView__name}>{selectedTask.name}</h2>
        <div className={styles.taskView__dropdown} ref={dropdownRef}>
          <button className={styles.taskView__dropdownToggle} onClick={toggle}>
            <VerticalEllipsisIcon />
          </button>

          {openDropdown && (
            <ul className={styles.taskView__dropdownMenu}>
              <li onClick={onEditTask}>Edit Task</li>
              <li onClick={onDeleteTask}>Delete Task</li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.taskView__description}>
        {selectedTask.description}
      </div>
      <div className={styles.taskView__subtasks}>
        <div className={styles.taskView__subtasksCount}>
          Subtasks ({completedSubtasks} of {selectedTask.subtasks.length})
        </div>
        <ul className={styles.taskView__subtasksList}>
          <Map
            data={selectedTask.subtasks}
            render={(sub) => (
              <li
                key={sub._id}
                className={cls(
                  styles.taskView__subtask,
                  sub.isCompleted && styles["taskView__subtask--completed"],
                )}
              >
                <label onClick={() => onToggleSubtask(sub._id)}>
                  <input type="checkbox" checked={sub.isCompleted} />
                  <span>{sub.name}</span>
                </label>
              </li>
            )}
          />
        </ul>
      </div>
      <div className={styles.taskView__status}>
        <div className={styles.taskView__statusTitle}>Current Status</div>
        <div className={styles.taskView__statusName}>{column.name}</div>
      </div>
    </div>
  );
};
