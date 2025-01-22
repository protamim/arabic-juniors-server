import { RequestHandler, type Request, type Response } from "express";
import { sendWelcomeEmail } from "../services/emailService";
import notifyAdmin from "../utils/notifyAdmin";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { firstName, email } = req.body;

  if (!firstName || !email) {
    res.status(400).json({ message: "Name and email are required." });
    return; // Ensure no further execution
  }

  try {
    // Call the service to send an email
    await sendWelcomeEmail(firstName, email);
    await notifyAdmin(firstName, email);

    console.log("user info from client: ", firstName, email);
    res.status(200).json({ message: "Registration successful. Email sent!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed. Could not send email.", error });
  }
};
