import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";
import { userController } from "./users.controller";

const router = Router();

router.get("/all-user", authMiddleware(UserType.admin), userController.getAllUser);
router.put("/user-status-change", authMiddleware(UserType.admin), userController.userStatusChange);
router.get("/view-orders", authMiddleware(UserType.admin), userController.viewOrders);
router.get("/view-medicines", authMiddleware(UserType.admin), userController.viewMedicines);


export const userRouter = router;