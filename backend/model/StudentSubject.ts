import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudentSubject extends Document {
  student_id: Types.ObjectId;
  subject: Types.ObjectId;
  semester: Types.ObjectId;
  section: string;
  room: number;
  time: string;
  units: number;
  hours: number;
  instructor: Types.ObjectId;
  midtermGrade: number;
  finalGrade: number;
}

const StudentSubjectSchema: Schema<IStudentSubject> = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    room: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    units: {
      type: Number,
      required: true,
      min: 0
    },
    hours: {
      type: Number,
      required: true,
      min: 0
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    midtermGrade: {
      type: Number,
      default: 0,
    },
    finalGrade: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StudentSubject = mongoose.model<IStudentSubject>(
  "StudentSubject",
  StudentSubjectSchema
);

export default StudentSubject;
