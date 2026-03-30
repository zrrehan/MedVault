import { Router } from "express";
import { medicineControllers } from "./medicine.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/create", medicineControllers.medicineCreate);
router.get("/all-medicine", medicineControllers.allMedicineGet);

export const postRouter = router;