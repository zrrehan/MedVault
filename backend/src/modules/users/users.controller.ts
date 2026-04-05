import { Request, Response } from "express";
import { userServices } from "./users.services";
import { returnHanding } from "../../utils/returnHanding";

const getAllUser = async (req: Request, res: Response)=> {
    try {
        const result = await userServices.getAllUser();
        const message = "All User Fetched Successfully";
        returnHanding(200, true, message, res, result)
    } catch(error: any) {
        res.send(error);
    }
}

export const userController = {
    getAllUser
}