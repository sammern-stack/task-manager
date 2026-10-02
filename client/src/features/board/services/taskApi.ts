import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import { BASE_URL } from "./boardApi";
import type {
  CreateTaskBody,
  TaskSchema,
  UpdateTaskBody,
} from "@/shared/types/task.types";

export const getTasksReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}/tasks`, method: "GET" });
  return requestHandler<TaskSchema[]>(() => api)();
};

export const getTaskReq = (boardId: string, taskId: string) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/tasks/${taskId}`,
    method: "GET",
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const createTaskReq = (boardId: string, task: CreateTaskBody) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/tasks`,
    method: "POST",
    data: task,
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const updateTaskReq = (
  boardId: string,
  taskId: string,
  updates: UpdateTaskBody,
) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/tasks/${taskId}`,
    method: "PUT",
    data: updates,
  });
  return requestHandler<TaskSchema>(() => api)();
};

export const deleteTaskReq = (boardId: string, taskId: string) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/tasks/${taskId}`,
    method: "DELETE",
  });
  return requestHandler<TaskSchema>(() => api)();
};
