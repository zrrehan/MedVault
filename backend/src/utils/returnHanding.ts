import { Response } from "express";

export function returnHanding(status: number, success: boolean, message: string, res: Response, data: any = null) {
    res.status(status).send({
        success: success,
        message: message,
        data: success ? data: null,
    })
}