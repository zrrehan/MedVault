import { Router } from "express";
import { medicineControllers } from "./medicine.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { UserType } from "../../types/UserType";

const router = Router();

router.post("/create", authMiddleware(UserType.seller), medicineControllers.medicineCreate);
router.get("/all-medicine", medicineControllers.allMedicineGet);

export const postRouter = router;