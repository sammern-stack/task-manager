import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  BoardSchema,
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";

export const BASE_URL = "/api/boards";

export const getBoardsReq = () => {
  const api = axios({ url: BASE_URL, method: "GET" });
  return requestHandler<BoardSchema[]>(() => api)();
};

export const getBoardReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}`, method: "GET" });
  return requestHandler<BoardSchema>(() => api)();
};

export const createBoardReq = (board: BoardCreateBody) => {
  const api = axios({ url: BASE_URL, method: "POST", data: board });
  return requestHandler<BoardSchema>(() => api)();
};

export const updateBoardReq = (boardId: string, updates: BoardUpdateBody) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}`,
    method: "PUT",
    data: updates,
  });
  return requestHandler<BoardSchema>(() => api)();
};

export const deleteBoardReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}`, method: "DELETE" });
  return requestHandler<BoardSchema>(() => api)();
};
