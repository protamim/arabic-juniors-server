import mongoose from "mongoose";

export interface UserDocument {
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
