import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudentSubject extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  section: string;
  room: number;
  time: string;
  academicYear: string;
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
    subject_id: {
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
    academicYear: {
      type: String,
      required: true,
      trim: true,
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
