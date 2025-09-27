import mongoose, { Schema, Document } from 'mongoose';
import { Image } from '../types/types';

export interface IDepartment extends Document {
  name: string;
  image: Image;
  status?: 'active' | 'inactive';
}

// Define the schema
const DepartmentSchema: Schema<IDepartment> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      imageUrl: { type: String, required: true },
      imagePublicId: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Create the model
const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);
export default Department;
