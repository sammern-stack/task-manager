import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as boardApi from "../services/boardApi";
import type {
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";
import type {
  CreateColumnBody,
  BulkUpdateColumnsBody,
} from "@/shared/types/column.types";

const BOARDS_KEY = "boards";
const BOARD_KEY = "board";

export const useBoards = () => {
  return useQuery({
    queryKey: [BOARDS_KEY],
    queryFn: () => boardApi.getBoardsReq(),
    select: (data) => data.data,
  });
};

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: [BOARD_KEY, boardId],
    queryFn: () => boardApi.getBoardReq(boardId),
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (board: BoardCreateBody) => boardApi.createBoardReq(board),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] }),
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => boardApi.deleteBoardReq(boardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] }),
  });
};

export const useUpdateBoard = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: BoardUpdateBody) =>
      boardApi.updateBoardReq(boardId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BOARD_KEY, boardId] });
    },
  });
};

export const useGetColumnsByBoardId = (boardId: string) => {
  return useQuery({
    queryKey: [BOARD_KEY, boardId, "columns"],
    queryFn: () => boardApi.getColumnsReq(boardId),
    enabled: Boolean(boardId),
  });
};

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (column: CreateColumnBody) =>
      boardApi.createColumnReq(boardId, column),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useCreateColumns = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columns,
    }: {
      boardId: string;
      columns: CreateColumnBody[];
    }) => {
      return boardApi.createColumnsReq(boardId, columns);
    },
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useUpdateColumns = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columns,
    }: {
      boardId: string;
      columns: BulkUpdateColumnsBody[];
    }) => {
      return boardApi.updateColumnsReq(boardId, columns);
    },
    onSuccess(_, { boardId }) {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};

export const useDeleteColumns = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardId,
      columnIds,
    }: {
      boardId: string;
      columnIds: string[];
    }) => {
      return boardApi.deleteColumnsReq(boardId, columnIds);
    },
    onSuccess(_, { boardId }) {
      queryClient.invalidateQueries({
        queryKey: [BOARD_KEY, boardId, "columns"],
      });
    },
  });
};
