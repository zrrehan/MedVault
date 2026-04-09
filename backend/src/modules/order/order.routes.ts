import { Router } from "express";
import { orderControllers } from "./order.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";

const router = Router();

router.post("/post-order", authMiddleware(UserType.seller, UserType.admin, UserType.customer), orderControllers.postOrder);
router.get("/get-orders", authMiddleware(UserType.seller, UserType.admin, UserType.customer), orderControllers.getAllOrder);
router.put("/update-status", authMiddleware(UserType.admin), orderControllers.updateOrderStatus);
router.put("/update-paid-status", orderControllers.updatePaidStatus);
export const orderRouter = router;