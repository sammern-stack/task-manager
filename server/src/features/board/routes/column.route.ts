import { Router } from "express";
import * as columnController from "../controllers/column.controller.js";

const router = Router();

router
  .route("/:columnId")
  .put(columnController.updateColumn)
  .delete(columnController.deleteColumn);

export default router;
