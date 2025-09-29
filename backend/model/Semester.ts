import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISemester extends Document {
    student_id: Types.ObjectId;
    term: "1st" | "2nd" | "Summer";
    schoolYear: string; // ex. "2025-2026"
    enrollmentStatus: 'Regular' | 'Irregular'
    course: Types.ObjectId;
}

const SemesterSchema: Schema<ISemester> = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            ref: "student",
            required: true
        },
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
        course: {
            type: Schema.Types.ObjectId,
            ref: "course",
            required: true
        },
    },
    { timestamps: true }
);

const Semester = mongoose.model<ISemester>("Semester", SemesterSchema);

export default Semester;
