import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as subtaskApi from "../../services/subtaskApi";
import type {
  CreateSubtaskBody,
  DeleteSubtaskBody,
  UpdateSubtaskBody,
} from "@/shared/types/task.types";

export const useCreateSubtasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
      subtasks,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      subtasks: CreateSubtaskBody[];
    }) => subtaskApi.createSubtasksReq(boardId, columnId, taskId, subtasks),
    onSuccess: ({ data: task }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.boardId] });
      queryClient.invalidateQueries({
        queryKey: ["task", task._id, task.boardId, task.columnId],
      });
    },
  });
};

export const useUpdateSubtasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
      updates,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      updates: UpdateSubtaskBody[];
    }) => subtaskApi.updateSubtasksReq(boardId, columnId, taskId, updates),
    onSuccess: ({ data: task }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.boardId] });
      queryClient.invalidateQueries({
        queryKey: ["task", task._id, task.boardId, task.columnId],
      });
    },
  });
};

export const useDeleteSubtasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
      subtaskIds,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      subtaskIds: DeleteSubtaskBody[];
    }) => subtaskApi.deleteSubtasksReq(boardId, columnId, taskId, subtaskIds),
    onSuccess: ({ data: task }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.boardId] });
      queryClient.invalidateQueries({
        queryKey: ["task", task._id, task.boardId, task.columnId],
      });
    },
  });
};

export const useToggleSubtask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
      subtaskId,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      subtaskId: string;
    }) => subtaskApi.toggleSubtaskReq(boardId, columnId, taskId, subtaskId),
    onSuccess: ({ data: task }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.boardId] });
      queryClient.invalidateQueries({
        queryKey: ["task", task._id, task.boardId, task.columnId],
      });
    },
  });
};
