import { Router } from "express";
import * as boardController from "../controllers/board.controller.js";
import * as columnController from "../controllers/column.controller.js";
import * as taskController from "../controllers/task.controller.js";

const router = Router();

router
  .route("/")
  .get(boardController.getBoards)
  .post(boardController.createBoard);

router
  .route("/:boardId")
  .get(boardController.getBoard)
  .put(boardController.updateBoard)
  .delete(boardController.deleteBoard);

router
  .route("/:boardId/columns")
  .get(columnController.getColumnsByBoardId)
  .post(columnController.createColumn);

router
  .route("/:boardId/columns/bulk")
  .post(columnController.createColumns)
  .put(columnController.updateColumns)
  .delete(columnController.deleteColumns);

router.get("/:boardId/tasks", taskController.getTasksByBoardId);

router
  .route("/:boardId/tasks/:taskId")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.post("/:boardId/columns/:columnId/tasks", taskController.createTask);

export default router;
