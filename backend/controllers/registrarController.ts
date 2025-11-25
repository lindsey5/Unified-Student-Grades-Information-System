import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import Registrar from "../model/Registrar";

export const createRegistrar = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const isExist = await Registrar.findOne({ email: req.body.email });

        if(isExist){
            res.status(409).json({ message: 'Email already exists' });
            return;
        }

        const registrar = await Registrar.create({ ...req.body, createdBy: req.user_id });

        res.status(201).json({ success: true, registrar });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error'})
    }
}

export const getRegistrars = async (req : Request, res : Response) => {
    try{
        const { searchTerm } = req.query;

        let filter : any = { };
        if(searchTerm){
            filter.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { code: { $regex: searchTerm, $options: 'i' } },
            ]
        }

        const registrars = await Registrar.find(filter).populate('createdBy');

        res.status(200).json({ success: true, registrars });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error'})
    }
}

export const getRegistrar = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const registrar = await Registrar.findById(req.user_id);

        res.status(200).json({ success: true, registrar });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}