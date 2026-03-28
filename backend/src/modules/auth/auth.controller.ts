import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { returnHanding } from "../../utils/returnHanding";

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authServices.userSignIn(req.body);
        const message = "User is created successfully!!"; 
        returnHanding(201, true, message, res, result)
    } catch(error: any) {
        res.send(error.message);
    }
}

export const authControllers = {
    userSignIn,
}