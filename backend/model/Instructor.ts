import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInstructor extends Document {
  firstname: string;
  lastname: string;
  department: Types.ObjectId; 
  status: 'active' | 'inactive' | 'deleted'
}

// Define the schema
const InstructorSchema: Schema<IInstructor> = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department", // references Department model
      required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        required: true,
        default: 'active'
    }
  },
  { timestamps: true }
);

// Create the model
const Instructor = mongoose.model<IInstructor>('Instructor', InstructorSchema);
export default Instructor;
