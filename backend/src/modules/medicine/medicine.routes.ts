import { Router } from "express";
import { medicineControllers } from "./medicine.controller";

const router = Router();

router.post("/create", medicineControllers.medicineCreate);
router.get("/all-medicine", medicineControllers.allMedicineGet);

export const postRouter = router;