import mongoose, { Schema, Types, Document } from 'mongoose';
import { hashPassword } from '../utils/authUtils';
import StudentSubject from './StudentSubject';
import Semester from './Semester';
import { Image } from '../types/types';

export interface IStudent extends Document {
  student_id: string;
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  password: string;
  gender: 'Male' | 'Female';
  image?: Image;
  course: Types.ObjectId;
  year_level: 1 | 2 | 3 | 4;
  status: 'Active' | 'Inactive' | 'Graduated';
}

// Define the schema
const StudentSchema: Schema<IStudent> = new Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    image: {
      imageUrl: { type: String },
      imagePublicId: { type: String },
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    year_level: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

// Hash password before save
StudentSchema.pre<IStudent>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

// Cascade delete: remove related subjects + semesters when student is deleted
StudentSchema.pre('findOneAndDelete', async function (next) {
  const student = await this.model.findOne(this.getFilter());
  if (student) {
    await StudentSubject.deleteMany({ student_id: student._id });
    await Semester.deleteMany({ student_id: student._id });
  }
  next();
});

// Create the model
const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
