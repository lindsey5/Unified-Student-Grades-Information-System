import mongoose, { Schema, Document } from "mongoose";

export interface ISemester extends Document {
  term: "1st" | "2nd" | "Summer";
  schoolYear: string; // ex. "2025-2026"
  enrollmentStatus: 'Regular' | 'Irregular'
  status: "active" | "inactive";
}

const SemesterSchema: Schema<ISemester> = new Schema(
  {
    term: {
      type: String,
      enum: ["1st", "2nd", "Summer"],
      required: true,
    },
    enrollmentStatus: {
      type: String,
      enum: ['Regular', 'Irregular'],
      required: true,
    },
    schoolYear: {
      type: String,
      required: true,
      match: /^\d{4}-\d{4}$/, // e.g. 2025-2026
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Semester = mongoose.model<ISemester>("Semester", SemesterSchema);

export default Semester;
