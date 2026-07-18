import { Router } from "express";
import * as boardController from "../controllers/board.controller.js";
import * as columnController from "../controllers/column.controller.js";

const router = Router();

router
  .route("/")
  .get(boardController.getBoards)
  .post(boardController.createBoard);

router
  .route("/:id")
  .get(boardController.getBoard)
  .delete(boardController.deleteBoard)
  .put(boardController.updateBoard);

router
  .route("/:boardId/columns")
  .get(columnController.getColumnsByBoardId)
  .post(columnController.createColumn);

router.route("/:boardId/columns/bulk").post(columnController.createColumns);

export default router;
