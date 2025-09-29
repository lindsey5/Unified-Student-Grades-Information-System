import { Request, Response } from "express";
import StudentSubject from "../model/StudentSubject";

export const createStudentSubject = async (req :Request, res : Response) => {
    try{
        const studentSubject = await StudentSubject.create(req.body);
        res.status(201).json({ success: true, studentSubject});

    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}

export const getStudentSubjects = async (req : Request, res :Response) => {
    try{
        const studentSubjects = await StudentSubject.find({ student_id: req.params.id, semester: req.query.semester}).populate(["instructor", "subject"])
        res.status(201).json({ success: true, studentSubjects});

    }catch(err : any){
        res.status(500).json({ message: err.message || "Server Error"})
    }
}