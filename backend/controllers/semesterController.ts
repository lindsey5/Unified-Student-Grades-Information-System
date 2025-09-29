import { Request, Response } from "express";
import Semester from "../model/Semester";

export const createSemester = async (req : Request, res : Response) => {
    try{
        const semester = await Semester.create(req.body);
        res.status(201).json({ success: true, semester});

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error'})
    }
}

export const getStudentSemester = async (req : Request, res : Response) => {
    try{

        const semesters = await Semester.find({ student_id: req.params.id })
        res.status(200).json({ success: true, semesters });

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error'})
    }
}

export const deleteSemester = async (req : Request, res : Response) => {
    try{
        const semester = await Semester.findByIdAndDelete(req.params.id);
        if(!semester){
            res.status(404).json({ message: 'Semester not found.'});
            return;
        }

        res.status(200).json({ success: true, message: 'Semester successfully deleted' })

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error'})
    }
}