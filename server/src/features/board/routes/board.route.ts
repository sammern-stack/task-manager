import { Router } from "express";
import * as boardController from "../controllers/board.controller.js";
import * as taskController from "../controllers/task.controller.js";

const router = Router();

router
  .route("/")
  .get(boardController.getBoards)
  .post(boardController.createBoard);

router
  .route("/:boardId")
  .get(boardController.getBoardById)
  .put(boardController.updateBoard)
  .delete(boardController.deleteBoard);

router.get("/:boardId/tasks", taskController.getTasks);

router
  .route("/:boardId/tasks/:taskId")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.post("/:boardId/columns/:columnId/tasks", taskController.createTask);

export default router;
