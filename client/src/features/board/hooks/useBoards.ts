import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { boardApi } from "../services/boardApi";
import type {
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";

const BOARDS_KEY = "boards";
const BOARD_KEY = "board";

export const useBoards = () => {
  return useQuery({
    queryKey: [BOARDS_KEY],
    queryFn: () => boardApi.getAll(),
  });
};

export const useBoard = (boardId: string) => {
  return useQuery({
    queryKey: [BOARD_KEY, boardId],
    queryFn: () => boardApi.getOne(boardId),
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (board: BoardCreateBody) => boardApi.create(board),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] }),
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => boardApi.delete(boardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] }),
  });
};

export const useUpdateBoard = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: BoardUpdateBody) => boardApi.update(boardId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOARDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [BOARD_KEY, boardId] });
    },
  });
};
