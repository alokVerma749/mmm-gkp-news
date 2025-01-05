import mongoose, { Document, Schema } from "mongoose";

export enum PermissionLevel {
  Publish = "Publish",
  UPDATE = "Update",
  DELETE = "Delete",
}

export interface AdminDocument extends Document {
  username: string;
  password: string;
  otp?: string;
  permissions: PermissionLevel;
}

const adminLoginSchema: Schema = new mongoose.Schema(
  {
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
    },
    permissions: {
      type: String,
      enum: Object.values(PermissionLevel),
      required: true,
      default: PermissionLevel.Publish,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>("Admin", adminLoginSchema);

export default Admin;
