import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  BoardSchema,
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";
import type {
  ColumnBulkCreateBody,
  ColumnCreateBody,
  ColumnSchema,
} from "@/shared/types/column.types";

const BASE_URL = "/api/boards";

export const boardApi = {
  getAll: () =>
    requestHandler<BoardSchema[]>(() =>
      axios({ url: BASE_URL, method: "GET" }),
    )(),

  getOne: (boardId: string) =>
    requestHandler<BoardSchema>(() =>
      axios({ url: `${BASE_URL}/${boardId}`, method: "GET" }),
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
      axios({ url: `${BASE_URL}/${boardId}`, method: "PUT", data: updates }),
    )(),

  getColumns: (boardId: string) =>
    requestHandler<ColumnSchema[]>(() =>
      axios({ url: `${BASE_URL}/${boardId}/columns`, method: "GET" }),
    )(),

  createColumn: (boardId: string, column: ColumnCreateBody) =>
    requestHandler<ColumnSchema>(() =>
      axios({
        url: `${BASE_URL}/${boardId}/columns`,
        method: "POST",
        data: column,
      }),
    )(),

  createColumns: (boardId: string, columns: ColumnBulkCreateBody) =>
    requestHandler<ColumnSchema>(() =>
      axios({
        url: `${BASE_URL}/${boardId}/columns`,
        method: "POST",
        data: columns,
      }),
    )(),
};
