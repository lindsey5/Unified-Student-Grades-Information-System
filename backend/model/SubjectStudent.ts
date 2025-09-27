import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubjectStudent extends Document {
  student_id: Types.ObjectId;
  subject_id: Types.ObjectId;
  midtermGrade: number;
  finalGrade: number;
}

// Define the schema
const SubjectStudentSchema: Schema<ISubjectStudent> = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student", // reference the Student model
      required: true,
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subject", // reference the Subject model
      required: true,
    },
    midtermGrade: {
      type: Number,
      default: 0, // default grade (optional)
    },
    finalGrade: {
      type: Number,
      default: 0, // default grade (optional)
    },
  },
  { timestamps: true }
);

// Create the model
const SubjectStudent = mongoose.model<ISubjectStudent>(
  "SubjectStudent",
  SubjectStudentSchema
);

export default SubjectStudent;
