import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type { ColumnSchema } from "@/shared/types/column.types";

const BASE_URL = "api/columns";

export const columnApi = {
  update: (columnId: string, updates: ColumnSchema) =>
    requestHandler<ColumnSchema>(() =>
      axios({ url: `${BASE_URL}/${columnId}`, method: "POST", data: updates }),
    )(),

  updateMany: (columnIds: string[], updates: ColumnSchema[]) =>
    requestHandler<ColumnSchema[]>(() =>
      axios({
        url: `${BASE_URL}/bulk`,
        method: "POST",
        data: { columnIds, updates },
      }),
    )(),

  delete: (columnId: string) =>
    requestHandler<void>(() =>
      axios({ url: `${BASE_URL}/${columnId}`, method: "DELETE" }),
    )(),

  deleteMany: (columnIds: string[]) =>
    requestHandler<void>(() =>
      axios({
        url: `${BASE_URL}/bulk`,
        method: "DELETE",
        data: { columnIds },
      }),
    )(),
};
