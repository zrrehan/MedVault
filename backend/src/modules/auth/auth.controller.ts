import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { returnHanding } from "../../utils/returnHanding";

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authServices.userSignIn(req.body);
        const message = "User is created successfully!!"; 
        returnHanding(201, true, message, res, result)
    } catch(error: any) {
        returnHanding(500, false, error.message, res)
    }
}

const userLogin = async(req: Request, res: Response) => {
    try {
        const result = await authServices.userLogin(req.body);
        res.send(result);
    } catch(error: any) {
        returnHanding(500, false, error.message, res)
    }
}

export const authControllers = {
    userSignIn, userLogin
}