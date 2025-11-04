import { Request, Response } from "express";
import StudentSubject from "../model/StudentSubject";
import { getStudentSubjectById } from "../services/studentSubjectService";
import { AuthenticatedRequest } from "../types/types";
import mongoose from "mongoose";

export const createStudentSubject = async (req :Request, res : Response) => {
    try{   
        const { student_id, subject, semester } = req.body;
        const isExist = await StudentSubject.findOne({ 
            student_id,
            subject,
            semester,
         })

         if(isExist){
            res.status(409).json({ message: 'Subject already exist for this semester'});
            return;
         }

        const studentSubject = await StudentSubject.create(req.body);
        res.status(201).json({ success: true, studentSubject});

    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}

export const getStudentSubjects = async (req : Request, res :Response) => {
    try{
        const studentSubjects  = await getStudentSubjectById(req.params.id, req.query.semester as string);
        res.status(200).json({ success: true, studentSubjects});
    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}


export const getAuthenticatedStudentSubjects = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const studentSubjects = await getStudentSubjectById(req.user_id as string, req.query.semester as string);
        res.status(200).json({ success: true, studentSubjects });
    } catch (err: any) {
        res.status(500).json({ message: err.message || "Server Error" });
    }
};

export const deleteStudentSubject = async (req : Request, res : Response) => {
    try{
        const studentSubject = await StudentSubject.findByIdAndDelete(req.params.id);
        if(!studentSubject){
            res.status(404).json({ message: "Student subject not found."});
            return;
        }

        res.status(200).json({ success: true, message: 'Student subject successfully removed.'});

    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}

export const editStudentSubject = async (req : Request, res : Response) => {
    try{
        const { student_id, subject, semester } = req.body;
        const isExist = await StudentSubject.findOne({
            _id: { $ne: req.params.id },
            student_id,
            subject,
            semester
        })
        if(isExist){
            res.status(409).json({ message: 'Subject already exist for this semester'});
            return;
         }

         const studentSubject = await StudentSubject.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if(!studentSubject){
            res.status(404).json({ message: 'Student subject not found.' });
            return;
         }

         res.status(200).json({ success: true, studentSubject });

    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}