import { Response } from "express";

export const uniqueErrorHandler = (error: any, res : Response, message: string) => {
    if (error.code === 11000) {
        res.status(409).json({ success: false, message });
        return;
    }
}