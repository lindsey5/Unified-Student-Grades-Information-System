import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import Registrar from "../model/Registrar";

export const createRegistrar = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const isExist = await Registrar.findOne({ email: req.body.email });

        if(isExist){
            res.status(409).json({ message: 'Please use a different email — this one is taken.' });
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
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
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

export const deleteRegistrar = async (req : Request, res : Response) =>{
    try{
        const registrar = await Registrar.findById(req.params.id);

        if(!registrar){
            res.status(404).json({ message: 'Registrar not found.'})
            return;
        }

        await registrar.deleteOne();
        
        res.status(200).json({ success: true, message: "Registrar deleted successfully.",});

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}

export const editRegistrar = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const { email, firstname ,lastname } = req.body;
        const registrar = await Registrar.findById(req.user_id);

        if(!registrar){
            res.status(404).json({ message: 'Registrar not found.'})
            return;
        }

        const isEmailExist = await Registrar.findOne({ email, _id: { $ne: req.user_id }});

        if(isEmailExist){
            res.status(409).json({ message: 'Please use a different email — this one is taken.'});
            return;
        }

        registrar.email = email || registrar.email;
        registrar.firstname = firstname || registrar.firstname;
        registrar.lastname = lastname || registrar.lastname;

        await registrar.save();
        
        res.status(200).json({ success: true, message: "Your profile updated successfully.",});

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}

export const editRegistrarThroughParams = async (req : Request, res : Response) => {
    try{
        const { email, firstname ,lastname, password } = req.body;
        const registrar = await Registrar.findById(req.params.id);

        if(!registrar){
            res.status(404).json({ message: 'Registrar not found.'})
            return;
        }

        const isEmailExist = await Registrar.findOne({ email, _id: { $ne: req.params.id }});

        if(isEmailExist){
            res.status(409).json({ message: 'Please use a different email — this one is taken.'});
            return;
        }

        registrar.email = email || registrar.email;
        registrar.firstname = firstname || registrar.firstname;
        registrar.lastname = lastname || registrar.lastname;
        if(password) registrar.password = password;

        await registrar.save();
        
        res.status(200).json({ success: true, message: "Registrar updated successfully.",});

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error.'});
    }
}