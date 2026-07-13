import { Router } from "express";
import * as boardController from "../controllers/board.controller.js";

const router = Router();

router
  .route("/")
  .get(boardController.getBoards)
  .post(boardController.createBoard);

export default router;
