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

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const result = await orderServices.updateOrderStatus(req.body.orderId,req.body.delivery_status as "SHIPPED" | "DELIVERED")
        const message = "Delivery Status Updated!"
        returnHanding(201, true, message, res, result);
    } catch(error: any) {
        returnHanding(500, false, "Somethin Wrong! Try later!", res, error)
    }
}

const updatePaidStatus = async(req: Request, res: Response) => {
    try {
        const {sessionId, orderId} = req.query;
        const result = await orderServices.updatePaidStatus(sessionId as string, orderId as string)
        returnHanding(200, true, "Updated Successfully", res, result);
    } catch(error: any) {
        returnHanding(500, false, "Somethin Wrong! Try later!", res, error)
    }
}

export const orderControllers = {
    postOrder, 
    getAllOrder, 
    updateOrderStatus, 
    updatePaidStatus
} 