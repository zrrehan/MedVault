import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";
import { userController } from "./users.controller";

const router = Router();

router.get("/all-user", authMiddleware(UserType.admin), userController.getAllUser);
router.put("/user-status-change", authMiddleware(UserType.admin), userController.userStatusChange);

export const userRouter = router;