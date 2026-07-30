import { Router } from "express";
import boardRouters from "@/features/board/routes/board.route.js";
import columnRouters from "@/features/board/routes/column.route.js";

const router = Router();

router.use("/boards", boardRouters);
router.use("/columns", columnRouters);

export default router;
