import { Router } from "express";
import { orderControllers } from "./order.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";

const router = Router();

router.post("/post-order", authMiddleware(UserType.seller), orderControllers.postOrder);

export const orderRouter = router;