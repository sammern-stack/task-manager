import styles from "./TaskDialog.module.scss";
import { useTaskFormStore } from "@/features/board/stores/taskFormStore";
import { useDropdown } from "@/shared/hooks/useDropdown";
import {
  FormDialog,
  FormEditingList,
  FormField,
  FormListItem,
  Map,
} from "@/shared/components";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import { useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useCreateTask } from "@/features/board/hooks/api/useTasks";
import { normalizeSubtasks } from "@/features/board/utils/normalizeColumns";
import { useDialogStore, useToastStore } from "@/shared/stores";

export const TaskCreateDialog = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const task = useTaskFormStore((s) => s.task);
  const { setTask, addSubtask, removeSubtask, setSubtaskName } =
    useTaskFormStore.getState();
  const boardColumns = useOpenBoardStore((s) => s.openBoard.columns);
  const boardId = useOpenBoardStore((s) => s.openBoard.id);
  const { mutate: createTask } = useCreateTask(boardId);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  const columnSelection = useMemo(() => {
    if (!boardColumns || !task) return [];
    return boardColumns.map((column) => ({
      id: column._id,
      name: column.name,
      isActive: task.columnId === column._id,
    }));
  }, [boardColumns, task]);

  const selectedColumn = columnSelection.find((c) => c.isActive)?.name;

  const handleChangeColumn = (id: string) => {
    setTask({ columnId: id });
    toggle();
  };

  if (!task) return null;

  const onCreateTask = () => {
    const selectedColumn = columnSelection.find((col) => col.isActive);
    if (!selectedColumn) return;

    createTask(
      {
        name: task.name,
        description: task.description,
        subtasks: normalizeSubtasks(task.subtasks),
        columnId: selectedColumn.id,
      },
      {
        onSuccess: ({ message }) => {
          addToast({ message, type: "success" });
          closeDialog();
        },
      },
    );
  };

  return (
    <FormDialog
      title="New Task"
      onSubmit={onCreateTask}
      submitLabel="+ Add new task"
    >
      <FormField
        label="Name"
        placeholder="e.g. Take coffee break"
        value={task.name}
        onChange={(e) => setTask({ name: e.target.value })}
      />
      <FormField
        as="textarea"
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will
recharge the batteries a little."
        value={task.description}
        onChange={(e) => setTask({ description: e.target.value })}
      />
      <FormEditingList
        title="Subtasks"
        list={task.subtasks}
        render={(s) => (
          <FormListItem
            key={s.id}
            placeholder="e.g. Todos, Doing, etc."
            value={s.subtask.name}
            onChange={(e) => setSubtaskName(s.id, e.target.value)}
            onRemove={() => removeSubtask(s.id)}
          />
        )}
        onAdd={addSubtask}
        buttonLabel="+ Add new subtask"
      />
      <div className={styles.dropdown} ref={dropdownRef}>
        <h2 className={styles.dropdown__title}>Status</h2>
        <button className={styles.dropdown__toggle} onClick={toggle}>
          {selectedColumn ?? "Select column"} <IoIosArrowDown />
        </button>

        {openDropdown && (
          <ul className={styles.dropdown__menu}>
            <Map
              data={columnSelection}
              render={(c) => (
                <li onClick={() => handleChangeColumn(c.id)}>{c.name}</li>
              )}
            />
          </ul>
        )}
      </div>
    </FormDialog>
  );
};
