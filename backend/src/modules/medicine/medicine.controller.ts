import { Request, Response } from "express";
import { medicineServices } from "./medicine.service";
import { returnHanding } from "../../utils/returnHanding";

const medicineCreate = async(req: Request, res: Response) => {
    try {
        const result = await medicineServices.medicineCreate(req.body);
        const message = "Medicine created Successful";
        returnHanding(201, true, message, res, result);
    } catch(error: any) {
        res.send(error);
    }
}

const allMedicineGet = async(req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const result = await medicineServices.allMedicineGet(search as string|| "");
        const message = "Searched Medicine got successfully";
        returnHanding(200, true, message, res, result);
    } catch(error: any) {
        res.send(error);
    }
}


export const medicineControllers = {
    medicineCreate, 
    allMedicineGet
}