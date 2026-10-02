import { Router } from "express";
import * as subtaskController from "../controllers/subtask.controller.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(subtaskController.createSubtasks)
  .put(subtaskController.updateSubtasks)
  .delete(subtaskController.deleteSubtasks);

router.use("/:subtaskId/toggle", subtaskController.toggleSubtask);

export default router;
