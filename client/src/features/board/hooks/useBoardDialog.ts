import { useEffect, useRef, useState } from "react";
import { useOpenBoardStore } from "../stores/openBoardStore";
import { useGetColumnsByBoardId } from "./useBoards";
import type { InputChangeEvent } from "@/shared/types/react.types";

export const useBoardDialog = (dialog: "create" | "update") => {
  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const { data: columns } = useGetColumnsByBoardId(openBoard.id ?? "");

  const initialBoardName = dialog === "create" ? "" : openBoard.name;
  const initialBoardColumns =
    dialog === "update" && columns
      ? columns.data.map((column) => ({
          id: crypto.randomUUID(),
          name: column.name,
        }))
      : [{ id: crypto.randomUUID(), name: "Todo" }];

  const shouldScrollToBottomRef = useRef(false);
  const columnsContainerRef = useRef<HTMLDivElement | null>(null);
  const [boardName, setBoardName] = useState(initialBoardName);
  const [error, setError] = useState<string | null>(null);
  const [boardColumns, setBoardColumns] = useState(initialBoardColumns);

  // Enable smooth scroll when adding new column
  useEffect(() => {
    if (!shouldScrollToBottomRef.current) return;

    const container = columnsContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    shouldScrollToBottomRef.current = false;
  }, [boardColumns.length]);

  const handleInputChange = (e: InputChangeEvent) => {
    if (error) setError(null);
    setBoardName(e.target.value);
  };

  const handleColumnChange = (e: InputChangeEvent, id: string) => {
    setBoardColumns((prev) =>
      prev.map((column) =>
        column.id === id ? { ...column, name: e.target.value } : column,
      ),
    );
  };

  const handleAddColumn = () => {
    shouldScrollToBottomRef.current = true;
    setBoardColumns((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
  };

  const handleRemoveColumn = (id: string) => {
    setBoardColumns((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    columnsContainerRef,
    boardName,
    boardColumns,
    error,
    setBoardName,
    setBoardColumns,
    setError,
    handleInputChange,
    handleColumnChange,
    handleAddColumn,
    handleRemoveColumn,
  };
};
