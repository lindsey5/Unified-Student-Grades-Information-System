import { Request, Response } from "express";
import Department from "../model/Department";
import { deleteImage, uploadImage } from "../services/cloudinaryService";
import { uniqueErrorHandler } from "../utils/errorHandler";

export const createDepartment = async (req : Request, res : Response) => {
    try{

        const { name, image } = req.body;
        if(!name){
            res.status(400).json({ message: "Department name is required" });
            return;
        }

        if(!image){
            res.status(400).json({ message: "Department image is required" });
            return;
        }

        let department = await Department.findOne({ name, status: 'active' })

        if(department){
            res.status(400).json({ message: 'Department already exists'});
            return;
        }

        const uploadedImage = await uploadImage(image);
        if(!uploadedImage){
            res.status(500).json({ message: "Image upload failed" });
            return;
        }

        department = await Department.findOne({ name, status: 'inactive' });
        if(department){
            department.status = 'active';
            department.image = uploadedImage;
            department = await department.save();
        }else {
            department = await Department.create({ name, image: uploadedImage });
        }

        res.status(201).json({ success: true , department});

    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getAllDepartments = async (req : Request, res : Response) => {
    try{
        const departments = await Department.find({ status: 'active' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, departments });
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const editDepartment = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const { name, image } = req.body;

        const isExist = await Department.findOne({ name, status: 'active' });
        if(isExist){
            res.status(409).json({ message: 'Deparment name already exists'});
            return;
        }

        const department = await Department.findById(id);
        if(!department){
            res.status(404).json({ message: "Department not found" });
            return;
        }

        let uploadedImage;

        if(image && department.image !== image) {
            uploadedImage = await uploadImage(image);
            await deleteImage(department.image.imagePublicId);
        }

        if(!uploadedImage){
            res.status(500).json({ message: "Image upload failed" });
            return;
        }

        department.name = name;
        department.image = uploadedImage;

        await department.save();

        res.status(200).json({ success: true, department });
    }catch(error : any){
        uniqueErrorHandler(error, res, "Department already exists");
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const deleteDepartment = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;
        const department = await Department.findById(id);
        if(!department){
            res.status(404).json({ message: "Department not found" });
            return;
        }
        department.status = 'inactive';
        await department.save();
        res.status(200).json({ success: true, message: "Department deleted successfully" });
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}

export const getTotalDepartments = async (req : Request, res : Response) => {
    try{
        const total = await Department.countDocuments({ status: 'active' });

        res.status(200).json({ success: true, total });
        
    }catch(error : any){
        res.status(500).json({ message: error.message || "Server Error" });   
    }
}