import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as boardApi from "../../services/boardApi";
import type {
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";

export const BOARDS_KEY = "boards";
export const BOARD_KEY = "board";

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
