import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";
import { userController } from "./users.controller";

const router = Router();

router.get("/all-user", authMiddleware(UserType.admin), userController.getAllUser);

export const userRouter = router;