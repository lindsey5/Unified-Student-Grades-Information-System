import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  code: string;
  status?: 'active' | 'inactive';
}

// Define the schema
const SubjectSchema: Schema<ISubject> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
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
const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);
export default Subject;
