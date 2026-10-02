import { Router } from "express";
import boardRouters from "@/features/board/routes/board.route.js";
import columnRouters from "@/features/board/routes/column.route.js";
import taskRouters from "@/features/board/routes/task.route.js";

const router = Router();

router.use("/boards", boardRouters);
router.use("/boards/:boardId/columns", columnRouters);
router.use("/boards/:boardId/tasks", taskRouters);

export default router;
