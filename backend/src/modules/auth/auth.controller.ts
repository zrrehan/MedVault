import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { returnHanding } from "../../utils/returnHanding";

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authServices.userSignIn(req.body);
        const message = "User is created successfully!!"; 
        returnHanding(201, true, message, res, result)
    } catch(error: any) {
        const message = "Use another email";
        returnHanding(500, false, message, res, error);
    }
}

const userLogin = async(req: Request, res: Response) => {
    try {
        const result = await authServices.userLogin(req.body);
        const message = "User login successful!!!"
        returnHanding(200, true, message, res, result)
    } catch(error: any) {
        const message = "Email or Password Incorrect!";
        returnHanding(500, false, error.message, res)
    }
}

export const authControllers = {
    userSignIn, userLogin
}