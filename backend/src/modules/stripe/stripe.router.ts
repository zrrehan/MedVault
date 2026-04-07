import { Router } from "express";
import { stripeController } from "./stripe.controller";

const router = Router();

router.post("/payment", stripeController.payment)

export const stripeRouter = router;