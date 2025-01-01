import mongoose, { Document, Schema } from "mongoose";

export interface AdminDocument extends Document {
  username: string;
  password: string;
  otp?: string;
}

const adminLoginSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: null,
  }
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', adminLoginSchema);

export default Admin;
