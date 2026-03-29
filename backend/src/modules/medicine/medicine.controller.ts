import { Request, Response } from "express";
import { medicineServices } from "./medicine.service";

const medicineCreate = async(req: Request, res: Response) => {
    try {
        const result = await medicineServices.medicineCreate(req.body);
        res.send(result);
    } catch(error: any) {
        res.send(error);
    }
}

const allMedicineGet = async(req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const result = await medicineServices.allMedicineGet(search as string|| "");
        res.send(result);
    } catch(error: any) {
        res.send(error);
    }
}


export const medicineControllers = {
    medicineCreate, 
    allMedicineGet
}