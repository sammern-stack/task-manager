import { Router } from "express";
import * as columnController from "../controllers/column.controller.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(columnController.getColumns)
  .post(columnController.createColumn);

router
  .route("/bulk")
  .post(columnController.createColumns)
  .put(columnController.updateColumns)
  .delete(columnController.deleteColumns);

router
  .route("/:columnId")
  .get(columnController.getColumnById)
  .put(columnController.updateColumn)
  .delete(columnController.deleteColumn);

export default router;
