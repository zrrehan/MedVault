import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { returnHanding } from "../../utils/returnHanding";

const postOrder = async (req: Request, res: Response) => {
    try {
        const result = await orderServices.postOrder(req.body);
        const message = "Order has created successfully!";
        returnHanding(201, true, message, res, result);
    } catch(error) {
        returnHanding(500, false, "Somethin Wrong! Try later!", res)
    }
}

const getAllOrder = async(req: Request, res: Response) => {
    try {
        const userId = req.userInfo?.id;
        console.log(userId)
        const result = await orderServices.getAllOrder(userId as string);
        const message = "All Order of this user fetched!"
        returnHanding(201, true, message, res, result);
    } catch(error) {
        returnHanding(500, false, "Somethin Wrong! Try later!", res)
    }
}

export const orderControllers = {
    postOrder, 
    getAllOrder
} 