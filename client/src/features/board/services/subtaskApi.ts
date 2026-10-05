import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import { BASE_URL } from "./boardApi";
import type {
  TaskSchema,
  CreateSubtaskBody,
  UpdateSubtaskBody,
} from "@/shared/types/task.types";

const baseUrl = (boardId: string, columnId: string, taskId: string) => {
  return `${BASE_URL}/${boardId}/columns/${columnId}/tasks/${taskId}/subtasks`;
};

export const createSubtasksReq = (
  boardId: string,
  columnId: string,
  taskId: string,
  subtasks: CreateSubtaskBody[],
) => {
  const api = axios({
    url: baseUrl(boardId, columnId, taskId),
    method: "POST",
    data: subtasks,
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const updateSubtasksReq = (
  boardId: string,
  columnId: string,
  taskId: string,
  updates: UpdateSubtaskBody[],
) => {
  const api = axios({
    url: baseUrl(boardId, columnId, taskId),
    method: "PUT",
    data: updates,
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const deleteSubtasksReq = (
  boardId: string,
  columnId: string,
  taskId: string,
  subtaskIds: { id: string }[],
) => {
  const api = axios({
    url: baseUrl(boardId, columnId, taskId),
    method: "DELETE",
    data: subtaskIds,
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const toggleSubtaskReq = (
  boardId: string,
  columnId: string,
  taskId: string,
  subtaskId: string,
) => {
  const api = axios({
    url: `${baseUrl(boardId, columnId, taskId)}/${subtaskId}/toggle`,
    method: "PATCH",
  });
  return requestHandler<TaskSchema>(() => api)();
};
