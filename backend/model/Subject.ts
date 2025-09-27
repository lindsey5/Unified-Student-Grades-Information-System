import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  code: string;
  time: string;
  academicYear: string;
}

// Define the schema
const SubjectSchema: Schema<ISubject> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Create the model
const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);
export default Subject;
