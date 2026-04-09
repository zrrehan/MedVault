import { Router } from "express";
import { stripeController } from "./stripe.controller";

const router = Router();

router.post("/payment", stripeController.payment);
router.get("/verify", stripeController.verifyPayment);

export const stripeRouter = router;