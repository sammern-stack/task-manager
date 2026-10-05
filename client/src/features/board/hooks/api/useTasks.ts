import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as taskApi from "../../services/taskApi";
import { useToastStore } from "@/shared/stores";
import type { CreateTaskBody, UpdateTaskBody } from "@/shared/types/task.types";

export const useGetTasks = (boardId: string) => {
  return useQuery({
    queryFn: () => taskApi.getTasksReq(boardId),
    queryKey: ["tasks", boardId],
    select: (response) => response.data,
  });
};

export const useGetTask = (boardId: string, taskId: string) => {
  return useQuery({
    queryFn: () => taskApi.getTaskReq(boardId, taskId),
    queryKey: ["task", boardId, taskId],
    select: (response) => response.data,
  });
};

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskBody) => taskApi.createTaskReq(boardId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
    },
  });
};

export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string;
      updates: UpdateTaskBody;
    }) => taskApi.updateTaskReq(boardId, taskId, updates),
    onSuccess: ({ data: task }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
      queryClient.invalidateQueries({ queryKey: ["task", boardId, task._id] });
    },
  });
};

export const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskApi.deleteTaskReq(boardId, taskId),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
      useToastStore.getState().addToast({ message, type: "success" });
    },
  });
};
