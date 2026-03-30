import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { CustomJwtPayload } from "../types/express";

export const authMiddleware = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(" ")[1] || null;
        if(!token) {
            res.status(401).send({
                success: false, 
                message: "You are unauthenticated! Please login"
            })
            return;
        }

        let userData;
        try {
            userData = jwt.verify(token as string, config.jwt_private_key as string);
        } catch(error) {
            res.status(401).send({
                success: false, 
                message: "You are unauthenticated! Please login"
            })
            return
        }
        req.userInfo = userData as CustomJwtPayload
        
        if(!roles.includes(req.userInfo.role)) {
            res.status(403).send({
                success: false, 
                message: "You are unauthorized!"
            })
            return;
        }
        next();
    }
}

