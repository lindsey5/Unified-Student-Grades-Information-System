import { Request, Response } from "express";
import Student from "../model/Student";
import generatePassword from "../utils/passwordGenerator";
import { sendStudentEmail } from "../services/emailService";
import { uniqueErrorHandler } from "../utils/errorHandler";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../types/types";

export const createStudent = async (req : Request, res : Response) => {
    try{

        const isExist = await Student.findOne({ email: req.body.email });
        if(isExist){
            res.status(409).json({ message: 'Email already exists'});
            return;
        }

        const password = generatePassword(12);
        req.body.password = password;

        console.log(password)

        const student = await Student.create(req.body);
        await sendStudentEmail(student, password);
        res.status(201).json({ success: true , student});

    }catch(error : any){
        uniqueErrorHandler(error, res, 'Student ID already exists')
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllStudents = async (req : Request, res : Response) => {
    try{
        const { page, limit, searchTerm, course, status } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        let query : any = { };
        if(searchTerm){ 
            query.$or = [
                { firstname: { $regex: searchTerm, $options: 'i' } },
                { lastname: { $regex: searchTerm, $options: 'i' } },
                { student_id: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        if(course && course !== 'All') query.course = course;

        if(status) query.status = status;

        const students = await Student.find(query)
            .populate('course')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);
        const total = await Student.countDocuments(query);

        res.status(200).json({ success: true, students, total, page: pageNumber, totalPages: Math.ceil(total / limitNumber) });
       
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

export const getStudentData = async (req : AuthenticatedRequest, res : Response) => {
        try{
        const student = await Student.findById(req.user_id).populate('course');
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
        
        const isExist = await Student.findOne({ email: req.body.email, _id: { $ne: id} });
        if(isExist){
            res.status(409).json({ message: 'Email already exists'});
            return;
        }

        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if(!student){
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ success: true, student });

    }catch(error : any){
        uniqueErrorHandler(error, res, 'Student ID already exists')
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const deleteStudent = async (req : Request, res : Response) => {
    try{
        const student  = await Student.findOneAndDelete({ _id: req.params.id });
        if(!student){
            res.status(404).json({ message: 'Student not found.'});
            return;
        }
        res.status(200).json({ success: true, message: 'Student successfully deleted.'})

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getStudentCountPerYearLevel = async (req: Request, res: Response) => {
    try {
        const { course } = req.query;

        const pipeline: any[] = [];

        // If course filter is provided
        if (course && course !== "all") {
            pipeline.push({
                $match: { course: new mongoose.Types.ObjectId(course as string) },
            });
        }

        // Group students by year_level
        pipeline.push(
            {
                $match: {
                    status: 'Active',
                }
            },
            {
                $group: {
                _id: "$year_level",
                count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            }
        );

        const students = await Student.aggregate(pipeline);

        // Transform into structured response
        const result = {
        year1: students.find((s) => s._id === 1)?.count || 0,
        year2: students.find((s) => s._id === 2)?.count || 0,
        year3: students.find((s) => s._id === 3)?.count || 0,
        year4: students.find((s) => s._id === 4)?.count || 0,
        };

        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

export const getTotalStudent = async (req : Request, res : Response) => {
    try{
        const total = await Student.countDocuments({ status: 'Active' });

        res.status(200).json({ success: true, total });

    }catch (error: any) {
        res.status(500).json({ message: error.message || "Server Error" });
    }
}

export const getRecentStudents = async (req : Request, res : Response) => {
    try{
        const recentStudents = await Student.find().populate('course').sort({ createAt: -1 }).limit(10);

        res.status(200).json({ success: true, recentStudents });

    }catch (error: any) {
        res.status(500).json({ message: error.message || "Server Error" });
    }
}

export const getStudentGenderCount = async (req: Request, res: Response) => {
  try {
    const { course, year_level } = req.query;
    const count = await Student.aggregate([
        { $match: { 
            ...(course && course !== "all" ? { course: new mongoose.Types.ObjectId(course as string) } : {}),
            ...(year_level && year_level !== "all" ? { year_level: parseInt(year_level as string) } : {}),
            status: 'Active',
        }},
        {
            $group: {
            _id: "$gender",        
            total: { $sum: 1 }    
            }
        }
    ]);

    res.status(200).json({ success: true, count });
  } catch (error: any) {
    console.log("Error fetching gender count:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const changeStudentPassword = async (req : AuthenticatedRequest , res : Response) => {
    try{
        const student = await Student.findById(req.user_id);
        if(!student){
            res.status(404).json({ error: 'Student not found.'});
            return;
        }
        student.password = req.body.newPassword;
        await student.save();

        res.status(200).json({ success: true, message: 'Password updated successfully.' })
    }catch(error : any){
        console.log("Error", error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
}