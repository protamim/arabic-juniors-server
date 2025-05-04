import { RequestHandler, type Request, type Response } from "express";
import User from "../models/user";
import { sendWelcomeEmail } from "../services/emailService";
import { notifyAdmin } from "../utils/notifyAdmin";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      res.status(400).json({ message: "First Name, Last Name, and email are required!" });
      return; // Ensure no further execution
    }
    // Call the service to send an email
    await sendWelcomeEmail(firstName, email);
    await notifyAdmin({userEmail: email, userName: firstName});

    // save to db
    const users = new User({firstName: firstName, lastName: lastName, email: email});
    await users.save();

    console.log("user info from client: ", firstName, lastName, email);
    res.status(200).json({ message: "Registration successful. Email sent!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed. Could not send email.", error });
  }
};
