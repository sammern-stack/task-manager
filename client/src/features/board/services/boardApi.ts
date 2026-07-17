import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  BoardSchema,
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";

const BASE_URL = "/api/boards";

export const boardApi = {
  getAll: () =>
    requestHandler<BoardSchema[]>(() =>
      axios({ url: BASE_URL, method: "GET" }),
    )(),

  create: (board: BoardCreateBody) =>
    requestHandler<BoardSchema>(() =>
      axios({ url: BASE_URL, method: "POST", data: board }),
    )(),

  delete: (boardId: string) =>
    requestHandler<BoardSchema>(() =>
      axios({ url: `${BASE_URL}/${boardId}`, method: "DELETE" }),
    )(),

  update: (boardId: string, updates: BoardUpdateBody) =>
    requestHandler<BoardSchema>(() =>
      axios({ url: `${BASE_URL}/${boardId}`, method: "POST", data: updates }),
    )(),
};
