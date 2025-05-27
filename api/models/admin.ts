import mongoose, { Document, Types } from "mongoose";

export interface AdminDocument extends Document {
  email: string;
  passwordHash: string;
  _id: Types.ObjectId;
}

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);
export default Admin;
