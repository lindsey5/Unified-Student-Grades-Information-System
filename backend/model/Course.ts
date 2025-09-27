import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  department: Types.ObjectId;
  status: 'active' | 'inactive';
}

// Define the schema
const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    }
  },
  { timestamps: true }
);

// Create the model
const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
