import { RequestHandler, type Request, type Response } from "express";
import User from "../models/user";
import { getClientLocation } from "../utils/getClientLocation";
import {
  sendTrialEmailToAdmin,
  sendTrialSessionEmailToUser,
} from "../services/emailService";
import { TrialRegFormTypes } from "../types";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userLocation = await getClientLocation(req);

    const body: TrialRegFormTypes = req.body;

    if (!body) {
      res.status(400).json({ message: "All fields are required!" });
      return; // Ensure no further execution
    }

    // save to db
    const registrationData = { ...body, userIP: userLocation?.city };
    const users = new User(registrationData);
    await users.save();

    // send email to user after register
    await sendTrialSessionEmailToUser({ ...body });

    // send email to admin after register a user for trial
    await sendTrialEmailToAdmin({ ...body });

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
