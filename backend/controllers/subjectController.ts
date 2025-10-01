import { Request, Response } from "express";
import Subject from "../model/Subject";
import { uniqueErrorHandler } from "../utils/errorHandler";

export const createSubject = async (req : Request, res : Response) => {
    try{
        let subject = await Subject.findOne({ name: req.body.name, status: 'inactive' });
        if(subject){
            subject.status = 'active';
            subject = await subject.save();
        }

        subject = await Subject.findOne({ name: req.body.name, status: 'active' });

        if(subject){
            res.status(400).json({ message: "Subject already exists" });
            return;
        }
        subject = await Subject.findOne({ name: req.body.name, status: 'inactive' })
        if(subject){
            subject.status = 'active',
            subject.name = req.body.name,
            subject.code = req.body.code
        }else{
            subject = await Subject.create(req.body);
        }
        
        res.status(201).json({ success: true , subject});
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllSubjects = async (req : Request, res : Response) => {
    try{
        const { page, limit, searchTerm } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        let filter : any = { status: 'active' };
        if(searchTerm){
            filter.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { code: { $regex: searchTerm, $options: 'i' } },
            ]
        }
        
        const subjects = await Subject.find(filter).skip(skip).limit(limitNumber).sort({ createdAt: -1});
        const total = await Subject.countDocuments(filter);

        res.status(200).json({
            success: true,
            subjects,
            page,
            total,
            totalPages: Math.ceil(total / limitNumber)
        })

    }catch(error : any){
        uniqueErrorHandler(error, res, "Subject already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const editSubject = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const { name, code } = req.body;

        const subject = await Subject.findById(id);
        if(!subject){
            res.status(404).json({ message: "Course not found" });
            return;
        }
        subject.name = name || subject.name;
        subject.code = code || subject.code;
        await subject.save();
        res.status(200).json({ success: true, subject });
    }catch(error : any){
        uniqueErrorHandler(error, res, "Subject already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}
