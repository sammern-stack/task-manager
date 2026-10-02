import { Router } from "express";
import boardRouters from "@/features/board/routes/board.route.js";
import columnRouters from "@/features/board/routes/column.route.js";
import taskRouters from "@/features/board/routes/task.route.js";
import subtaskRoutes from "@/features/board/routes/subtask.route.js";

const router = Router();

router.use("/boards", boardRouters);
router.use("/boards/:boardId/columns", columnRouters);
router.use("/boards/:boardId/tasks", taskRouters);
router.use(
  "/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks",
  subtaskRoutes,
);

export default router;
