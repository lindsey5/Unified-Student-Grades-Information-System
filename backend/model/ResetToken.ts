import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IResetToken extends Document {
    student_id: Types.ObjectId; 
    resetPasswordToken: string;
    resetPasswordExpire: Date;
}

const ResetTokenSchema: Schema<IResetToken> = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    resetPasswordToken: { type: String, required: true },
    resetPasswordExpire: { type: Date, required: true }
  },
  { timestamps: true }
);

const ResetToken = mongoose.model<IResetToken>('ResetToken', ResetTokenSchema);
export default ResetToken;
