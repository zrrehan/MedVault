import { Response } from "express";

export function returnHanding(status: number, succes: boolean, message: string, res: Response, data: any) {
    res.status(status).send({
        success: succes,
        message: message,
        data: data,
    })
}