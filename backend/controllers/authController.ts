import { Request, Response } from "express";
import Admin from "../model/Admin";
import { createToken, verifyPassword } from "../utils/authUtils";
import Student from "../model/Student";
import Registrar from "../model/Registrar";
import { AuthenticatedRequest } from "../types/types";
import { sendResetEmail } from "../services/emailService";
import ResetToken from "../model/ResetToken";
import crypto from 'crypto'

const maxAge = 1 * 24 * 60 * 60; 

export const adminLogin = async (req : Request, res : Response) => {
    try{
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email, status: 'active' });
        
        if(!admin){
            res.status(404).json({ message: "Email not found"})
            return;
        }

        const isMatch = await verifyPassword(password, admin.password);
  
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect Password'})
            return;
        }
        const token = createToken(admin._id as string);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'lax',      
            secure: true        
        });

        res.status(201).json({ success: true })
    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error' });
    }
}

export const registrarLogin = async (req : Request, res : Response) => {
    try{
        const { email, password } = req.body;
        const registrar = await Registrar.findOne({ email });
        
        if(!registrar){
            res.status(404).json({ message: "Email not found"})
            return;
        }

        const isMatch = await verifyPassword(password, registrar.password);
  
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect Password'})
            return;
        }
        const token = createToken(registrar._id as string);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'lax',      
            secure: true        
        });

        res.status(201).json({ success: true })
    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error' });
    }
}

export const studentLogin = async (req : Request, res : Response) => {
    try{
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        
        if(!student){
            res.status(404).json({ message: "Email not found"})
            return;
        }

        const isMatch = await verifyPassword(password, student.password);
  
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect Password'})
            return;
        }
        const token = createToken(student._id as string);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: 'lax',      
            secure: true        
        });

        res.status(201).json({ success: true })
    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error' });
    }
}

export const logout = (req : Request, res : Response) =>{
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'lax' });
    res.status(200).json({ success: true });
}

export const getUser = async (req : AuthenticatedRequest, res : Response) => {
    try{

        const student = await Student.findById(req.user_id);

        if(student){
            res.status(200).json({ success: true, role: "student" })
            return;
        }

        const admin = await Admin.findById(req.user_id);

        if(admin){
            res.status(200).json({ success: true, role: "admin" });
            return;
        }

        const registrar = await Registrar.findById(req.user_id);

        if(registrar){
            res.status(200).json({ success: true, role: "registrar" });
            return;
        }


        res.status(404).json({ message: "No user found."})

    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error' });
    }
}

export const forgotPassword = async (req : Request, res : Response) => {
    try{
        const student = await Student.findOne({ email: req.body.email });

        if(!student){
            res.status(404).json({ message: 'Email doesn\'t exists.'});
            return;
        }

        await ResetToken.findOneAndDelete({ student_id: student._id });

        // Create reset token
        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        await ResetToken.create({ 
            student_id: student._id, 
            resetPasswordToken: hashedToken,
            resetPasswordExpire: Date.now() + 5 * 60 * 1000
        })

        await sendResetEmail(student.email, token);

        res.status(200).json({ success: true, message: 'A password reset link has been sent to your email. Please check your inbox.' });
    }catch(err : any){
        res.status(500).json({ message: err.message || 'Server Error' });
    }
}

export const resetPassword = async (req : Request, res : Response) => {
    try{
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const resetToken = await ResetToken.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!resetToken) {
            res.status(400).json({ message: 'Token is invalid or expired.' });
            return;
        }

        const student = await Student.findById(resetToken.student_id);
        if(!student){
            res.status(404).json({ success: false, message: 'Student not found'});
            return;
        }

        if(!student.password){
            res.status(400).json({ success: false, message: 'Failed to reset password. This account was created using Google Sign-In.'})
            return;
        }

        student.password = newPassword;
        await student.save();
        await resetToken.deleteOne();

        res.status(200).json({ success: true, message: 'Password has been reset successfully!' });
    }catch(err : any){
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};