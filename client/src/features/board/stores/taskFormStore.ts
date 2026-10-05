import { create } from "zustand";
import type {
  CreateSubtaskBody,
  Subtask,
  SubtaskSchema,
  UpdateSubtaskBody,
} from "@/shared/types/task.types";

type FormTask = {
  name: string;
  description: string;
  subtasks: FormSubtask[];
  columnId: string;
};

export type FormSubtask = {
  id: string;
  subtask: SubtaskSchema | Subtask;
};

interface TaskFormStore {
  taskForm: "createTask" | "updateTask" | null;
  task: FormTask | null;
  originalSubtasks: FormSubtask[] | null;

  buildCreateSubtasksArray: () => CreateSubtaskBody[];
  buildUpdateSubtasksArray: () => UpdateSubtaskBody[];
  buildDeleteSubtasksArray: () => { id: string }[];

  startCreateTask: () => void;
  startUpdateTask: (
    name: string,
    description: string,
    subtasks: SubtaskSchema[],
    columnId: string,
  ) => void;

  setTask: (task: Omit<Partial<FormTask>, "subtasks">) => void;

  addSubtask: () => void;
  removeSubtask: (subtaskId: string) => void;
  setSubtaskName: (subtaskId: string, name: string) => void;
}

export const useTaskFormStore = create<TaskFormStore>((set, get) => ({
  taskForm: null,
  task: null,
  originalSubtasks: null,

  buildCreateSubtasksArray: () => {
    const state = get();
    if (!state.task || !state.originalSubtasks) return [];

    const current = state.task.subtasks;

    return (
      current
        .map((col) => col.subtask)
        .filter((col) => !("_id" in col)) as CreateSubtaskBody[]
    ).filter((column) => column.name.length > 0);
  },
  buildUpdateSubtasksArray: () => {
    const state = get();
    if (!state.task || !state.originalSubtasks) return [];

    const original = state.originalSubtasks;
    const current = state.task.subtasks;

    const originalColumns = original
      .map((col) => col.subtask)
      .filter((col) => "_id" in col);

    const existingColumns = current
      .map((col) => col.subtask)
      .filter((col) => "_id" in col);

    return existingColumns
      .map((column) => {
        const originalColumn = originalColumns.find(
          (col) => col._id === column._id,
        );
        if (!originalColumn) return;

        const hasUpdates = originalColumn.name !== column.name;

        if (hasUpdates)
          return {
            id: column._id,
            updates: {
              name: column.name,
            },
          };
      })
      .filter((item) => item !== undefined);
  },
  buildDeleteSubtasksArray: () => {
    const state = get();
    if (!state.task || !state.originalSubtasks) return [];

    const original = state.originalSubtasks;
    const current = state.task.subtasks;

    return (
      original
        .filter((column) => !current.some((col) => col.id === column.id))
        .map((column) => column.subtask) as SubtaskSchema[]
    ).map((column) => ({ id: column._id }));
  },

  startCreateTask: () => {
    set({
      taskForm: "createTask",
      task: {
        name: "",
        description: "",
        subtasks: [
          {
            id: crypto.randomUUID(),
            subtask: { name: "Todo", isCompleted: false },
          },
        ],
        columnId: "Select column",
      },
    });
  },
  startUpdateTask: (name, description, subtasks, columnId) => {
    const taskSubtasks = subtasks.map((subtask) => ({
      id: crypto.randomUUID(),
      subtask,
    }));

    set({
      taskForm: "updateTask",
      task: { name, description, subtasks: taskSubtasks, columnId },
      originalSubtasks: taskSubtasks,
    });
  },

  setTask: (newTask) => {
    const state = get();
    if (!state.task) return;

    set({ task: { ...state.task, ...newTask } });
  },

  addSubtask: () => {
    const state = get();
    if (!state.task) return;

    set({
      task: {
        ...state.task,
        subtasks: [
          ...state.task.subtasks,
          {
            id: crypto.randomUUID(),
            subtask: { name: "New Column", isCompleted: false },
          },
        ],
      },
    });
  },
  removeSubtask: (subtaskId) => {
    const state = get();
    if (!state.task) return;

    set({
      task: {
        ...state.task,
        subtasks: state.task.subtasks.filter((sub) => sub.id !== subtaskId),
      },
    });
  },
  setSubtaskName: (subtaskId, name) => {
    const state = get();
    if (!state.task) return;

    const subtask = state.task.subtasks.find((sub) => sub.id === subtaskId);
    if (!subtask) return;

    set({
      task: {
        ...state.task,
        subtasks: state.task.subtasks.map((sub) =>
          sub.id === subtaskId
            ? { ...subtask, subtask: { ...subtask.subtask, name } }
            : sub,
        ),
      },
    });
  },
}));
