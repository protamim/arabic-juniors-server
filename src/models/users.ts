import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
