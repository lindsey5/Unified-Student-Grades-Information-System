import { Request, Response } from "express";
import Course from "../model/Course";
import mongoose from "mongoose";
import { uniqueErrorHandler } from "../utils/errorHandler";

export const createCourse = async (req: Request, res : Response) => {
    try{
        const { name, department } = req.body;
        if(!name){
            res.status(400).json({ message: "Course name is required" });
            return;
        }
        if(!department){
            res.status(400).json({ message: "Department is required" });
            return;
        }
        let course = await Course.findOne({ name, department, status: 'inactive' });
        if(course){
            course.status = 'active';
            course = await course.save();
        }else{
            course = await Course.create({ name, department }); 
        }
        
        res.status(201).json({ success: true , course});

    }catch(error : any){
        uniqueErrorHandler(error, res, "Course already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllCourses = async (req : Request, res : Response) => {
    try{
        const { department, searchTerm } = req.query;

        let filter = { status: 'active' } as any;

        if(department && department !== "All"){
            filter = { ...filter, department: new mongoose.Types.ObjectId(department as string) };
        }

        if(searchTerm){
            filter = { ...filter, name: { $regex: searchTerm, $options: 'i' } };
        }

        const courses = await Course.find(filter).populate('department').sort({ name: 1 });
        res.status(200).json({ success: true, courses });
    }catch(error : any){
        console.log(error)
        res.status(500).json({ message: error.message || "Server Error" });
    }
}

export const deleteCourse = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const course = await Course.findById(id);
        if(!course){
            res.status(404).json({ message: "Course not found" });
            return;
        }
        course.status = 'inactive';
        await course.save();
        res.status(200).json({ success: true, message: "Course deleted successfully" });
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const editCourse = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const { name, department } = req.body;
        const course = await Course.findById(id);
        if(!course){
            res.status(404).json({ message: "Course not found" });
            return;
        }
        course.name = name || course.name;
        course.department = department || course.department;
        await course.save();
        res.status(200).json({ success: true, course });
    }catch(error : any){
        uniqueErrorHandler(error, res, "Course already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getTotalCourses = async (req : Request, res : Response) =>{
    try{
        const total = await Course.countDocuments({ status: 'active' });
        res.status(200).json({ success: true, total });

    }catch(error : any){
        uniqueErrorHandler(error, res, "Course already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}