import { Request, Response } from "express";
import { userServices } from "./users.services";
import { returnHanding } from "../../utils/returnHanding";

const getAllUser = async (req: Request, res: Response)=> {
    try {
        const result = await userServices.getAllUser();
        const message = "All User Fetched Successfully";
        returnHanding(200, true, message, res, result)
    } catch(error: any) {
        returnHanding(500, false, "Something Went Wrong", res, error);
    }
}

const userStatusChange = async(req: Request, res: Response) => {
    try {
        const {userId} = req.query;
        const result = await userServices.userStatusChange(userId as string);
        const message = "Ban Status Changed!!"
        returnHanding(200, true, message, res, result);
    } catch(error: any){
        returnHanding(500, false, "Something Went Wrong", res, error);
    }
}

const viewOrders = async(req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const result = await userServices.viewOrders(search as string);
        const message = "All Order Fetched Successfully";
        returnHanding(200, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, "Something Went Wrong", res, error);
    }
}
const viewMedicines = async(req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const result = await userServices.viewMedicines(search as string);
        const message = "All Order Fetched Successfully";
        returnHanding(200, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, "Something Went Wrong", res, error);
    }
}

const updateOwnProfile = async(req: Request, res: Response) => {
    try {
        const result = await userServices.updateOwnProfile(req.userInfo, req.body);
        const message = "Your Profile is updated";
        console.log("result", result);
        returnHanding(200, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, "Something Went Wrong", res, error);
    }
}

export const userController = {
    getAllUser, 
    userStatusChange, 
    viewOrders, 
    viewMedicines, 
    updateOwnProfile
}