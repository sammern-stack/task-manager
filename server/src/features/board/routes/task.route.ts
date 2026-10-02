import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const router = Router({ mergeParams: true });

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router
  .route("/:taskId")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
