import nodemailer from 'nodemailer'
import { IStudent } from '../model/Student';

export const sendStudentEmail = async (student : IStudent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const htmlContent = `
        ${student.firstname} ${student.lastname},<br/><br/>
        Your account has been created successfully. Below are your account details:<br/><br/>
        <strong>Student ID:</strong> ${student.student_id}<br/>
        <strong>Email:</strong> ${student.email}<br/>
        <strong>Temporary Password:</strong> ${student.password}<br/><br/>
        Please log in and change your password immediately for security purposes.<br/><br/>
        Thank you,<br/>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Student Account Information',
      html: htmlContent,
    });

    return verificationCode;
  } catch (err : any) {
    throw new Error(err.message)
  }
};