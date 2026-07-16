import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { boardApi } from "../services/boardApi";
import type { BoardCreateBody } from "@/shared/types/board.types";

const BOARDS_KEY = "boards";

export const useBoards = () => {
  return useQuery({
    queryKey: [BOARDS_KEY],
    queryFn: () => boardApi.getAll(),
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
