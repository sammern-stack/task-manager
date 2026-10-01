import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as columnApi from "../services/columnApi";
import { BOARD_KEY } from "./useBoards";
import type {
  BulkUpdateColumnsBody,
  CreateColumnBody,
} from "@/shared/types/column.types";

export const useGetColumnsByBoardId = (boardId: string) => {
  return useQuery({
    queryKey: [BOARD_KEY, boardId, "columns"],
    queryFn: () => columnApi.getColumnsReq(boardId),
    enabled: Boolean(boardId),
    select: (data) => data.data,
  });
};

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (column: CreateColumnBody) =>
      columnApi.createColumnReq(boardId, column),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useCreateColumns = () => {
  const queryClient = useQueryClient();

  interface MutationFnProps {
    boardId: string;
    columns: CreateColumnBody[];
  }

  return useMutation({
    mutationFn: ({ boardId, columns }: MutationFnProps) =>
      columnApi.createColumnsReq(boardId, columns),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useUpdateColumns = () => {
  const queryClient = useQueryClient();

  interface MutationFnProps {
    boardId: string;
    columns: BulkUpdateColumnsBody[];
  }

  return useMutation({
    mutationFn: ({ boardId, columns }: MutationFnProps) =>
      columnApi.updateColumnsReq(boardId, columns),
    onSuccess(_, { boardId }) {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useDeleteColumns = () => {
  const queryClient = useQueryClient();

  interface MutationFnProps {
    boardId: string;
    columnIds: string[];
  }

  return useMutation({
    mutationFn: ({ boardId, columnIds }: MutationFnProps) =>
      columnApi.deleteColumnsReq(boardId, columnIds),
    onSuccess(_, { boardId }) {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};
