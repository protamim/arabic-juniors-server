import mongoose from "mongoose";
export interface UserDocument {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  grade: number;
  howManyJoin: string;
  preferredTeacher: string;
  classStartDate: Date;
  classStartTime: string;
  howFindUs: string;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  phoneNumber: { type: String, required: true },
  grade: { type: Number, required: true },
  howManyJoin: { type: String, required: true },
  preferredTeacher: { type: String, required: true },
  classStartDate: { type: Date, required: true },
  classStartTime: { type: String, required: true },
  howFindUs: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
