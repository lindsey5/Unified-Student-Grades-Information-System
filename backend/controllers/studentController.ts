import { Request, Response } from "express";
import Student from "../model/Student";
import generatePassword from "../utils/passwordGenerator";
import { sendStudentEmail } from "../services/emailService";

export const createStudent = async (req : Request, res : Response) => {
    try{
        let student = await Student.findById(req.body._id);
        if(student){
            res.status(400).json({ message: "Student already exists" });
            return;
        }

        const password = generatePassword();
        req.body.password = password;

        student = await Student.create(req.body);
        await sendStudentEmail(student);
        res.status(201).json({ success: true , student});

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllStudents = async (req : Request, res : Response) => {
    try{
        const { page, limit, searchTerm, section, course } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        let query : any = {};
        if(searchTerm){
            query.$or = [
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } },
                { student_id: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        if(section){
            query.section = section;
        }

        if(course){
            query.course = course;
        }

        const students = await Student.find(query)
            .populate('course')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);
        const total = await Student.countDocuments(query);

        res.status(200).json({ success: true, students, total, page: pageNumber, pages: Math.ceil(total / limitNumber) });
       
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getStudentById = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const student = await Student.findById(id).populate('course');
        if(!student){
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ success: true, student });
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });
    }
}

export const editStudent = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;

        let student = await Student.findOne({ student_id: req.body.student_id, _id: { $ne: id } });
        if(student){
            res.status(400).json({ message: "Student ID already exists" });
            return;
        }

        student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if(!student){
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ success: true, student });

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}