import { Request, Response } from "express";
import { medicineServices } from "./medicine.service";
import { returnHanding } from "../../utils/returnHanding";

const medicineCreate = async(req: Request, res: Response) => {
    try {
        const result = await medicineServices.medicineCreate(req.body);
        const message = "Medicine created Successful";
        returnHanding(201, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, error.message, res, error);
    }
}

const allMedicineGet = async(req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const result = await medicineServices.allMedicineGet(search as string|| "");
        const message = "Searched Medicine got successfully";
        returnHanding(200, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, error.message, res, error);
    }
}

const editMedicine = async(req: Request, res: Response) => {
    try {
        const medicineId = req.body.medicineId; 
        const newData = req.body.newData;
        const result = await medicineServices.editMedicine(medicineId, newData);
        const message = "Medicine Edited Successfully";
        returnHanding(200, true, message, res, result)
    } catch(error: any) {{
        returnHanding(500, false, error.message, res, error);
    }} 
}


export const medicineControllers = {
    medicineCreate, 
    allMedicineGet, 
    editMedicine
}