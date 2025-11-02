import { Request, Response } from "express";
import Admin from "../model/Admin";
import { AuthenticatedRequest } from "../types/types";

export const createAdmin = async (req : Request, res : Response) => {
    try{

        const admin = await Admin.create(req.body);

        res.status(201).json({ success: true, admin });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}

export const getAdmin = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const admin = await Admin.findById(req.user_id);

        res.status(200).json({ success: true, admin });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}

export const getAllAdmins = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const admins = await Admin.find({ _id: { $ne: req.user_id }});

        res.status(200).json({ success: true, admins });
        
    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}

export const deleteAdmin = async (req : Request, res : Response) =>{
    try{
        const admin  = await Admin.findOneAndDelete({ _id: req.params.id });
        if(!admin){
            res.status(404).json({ message: 'Admin not found.'});
            return;
        }
        res.status(200).json({ success: true, message: 'Admin successfully deleted.'})

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}