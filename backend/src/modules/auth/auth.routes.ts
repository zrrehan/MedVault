import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/signup", authControllers.userSignIn);
router.post("/login", authControllers.userLogin)

export const authRouter = router;