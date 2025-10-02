import { Request, Response } from "express";
import Instructor from "../model/Instructor";

export const createInstructor = async (req : Request, res : Response) => {
    try{
        const instructor = await Instructor.create({ ...req.body, status: req.body.status.toLowerCase()});
        res.status(201).json({ success: true, instructor})

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllInstructors = async (req : Request, res: Response) => {
    try{
        const { page, limit, searchTerm, department } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        let query : any = { status: { $ne: 'deleted' }};
        if(searchTerm){ 
            query.$or = [
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        if(department && department !== 'All') query.department = department;

        const instructors = await Instructor
            .find(query)
            .skip(skip)
            .limit(limitNumber)
            .populate('department')
            .sort({ createdAt: -1});
        const total = await Instructor.countDocuments(query);

        res.status(200).json({
            success: true,
            instructors,
            total,
            page,
            totalPages: Math.ceil(total / limitNumber)
        })
        
    }catch(err : any){
        console.log(err)
        res.status(500).json({ message: err.message || 'Server Error' })
    }
}

export const getTotalInstructors = async (req : Request, res :Response) =>{
    try{
        const total = await Instructor.countDocuments({ status: 'active' });

        res.status(200).json({ success: true, total });

    }catch(err : any){
        console.log(err)
        res.status(500).json({ message: err.message || 'Server Error' })
    }
}