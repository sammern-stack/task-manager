import { useState } from "react";

export type Error = {
  message: string;
};

type ErrorType = "boardName" | "columnName";

type BoardErrors = {
  [K in ErrorType]: Error | null;
};

export const useBoardError = () => {
  const [boardError, setBoardError] = useState<BoardErrors>({
    boardName: null,
    columnName: null,
  });

  const getError = (type: ErrorType) => boardError[type];

  const setError = (type: ErrorType, error: Error) => {
    setBoardError((prev) => ({ ...prev, [type]: error }));
  };

  const clearError = (type: ErrorType) => {
    setBoardError((prev) => ({ ...prev, [type]: null }));
  };

  return { getError, setError, clearError };
};
