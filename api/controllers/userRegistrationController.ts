import { RequestHandler, type Request, type Response } from "express";
import User from "../models/user";
import { sendWelcomeEmail } from "../services/emailService";
import { notifyAdmin } from "../utils/notifyAdmin";
import { getUserLocation } from "../utils/getUserLocation";

// interface RegistrationDataTypes {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   grade: number;
//   howManyJoin: string;
//   preferredTeacher: string;
//   classStartDate: Date;
//   classStartTime: string;
//   howFindUs: string;
// }

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userLocation = await getUserLocation();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      grade,
      howManyJoin,
      preferredTeacher,
      classStartDate,
      classStartTime,
      howFindUs,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !grade ||
      !howManyJoin ||
      !preferredTeacher ||
      !classStartDate ||
      !classStartTime ||
      !howFindUs
    ) {
      res.status(400).json({ message: "All fields are required!" });
      return; // Ensure no further execution
    }

    // Call the service to send an email
    await sendWelcomeEmail(firstName, email);
    await notifyAdmin({ userEmail: email, userName: firstName });

    // save to db
    const registrationData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      grade,
      howManyJoin,
      preferredTeacher,
      classStartDate,
      classStartTime,
      howFindUs,
      userIP: userLocation?.ip
    };

    const users = new User(registrationData);
    await users.save();

    res.status(200).json({ message: "Registration successful. Email sent!" });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      res.status(409).json({ message: "Email is already in use" });
      return;
    }

    res
      .status(500)
      .json({ message: "Registration failed. Could not send email.", error });
  }
};
