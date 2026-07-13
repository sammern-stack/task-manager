import { Router } from "express";
import boardRouters from "@/features/board/routes/board.route.js";

const router = Router();

router.use("/boards", boardRouters);

export default router;
