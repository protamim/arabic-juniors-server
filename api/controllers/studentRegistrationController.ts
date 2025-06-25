import type { Request, Response } from "express";
import { StudentRegistrationFormTypes } from "../types";
import StudentRegistration from "../models/studentRegistration";
import { sendStudentRegConfirmationEmail } from "../services/emailService";

const studentRegistration = async (req: Request, res: Response) => {
  const body: StudentRegistrationFormTypes = req.body;
  const TEACHING_HOURS_PER_PACKAGE = {
    beginner: { hour: 4 },
    intermediate: { hour: 8 },
    advanced: { hour: 12 },
    expert: { hour: 16 },
  };

  try {
    const {
      class_start_date,
      email,
      first_name,
      last_name,
      preferred_days,
      preferred_time,
      pricing_package,
    } = body;

    const packageName = pricing_package?.split(" ")[0].toLowerCase();
    const monthlyHours =
      TEACHING_HOURS_PER_PACKAGE[
        packageName as keyof typeof TEACHING_HOURS_PER_PACKAGE
      ]?.hour;

    if (!monthlyHours) {
      res.status(400).json({
        message: "Invalid or missing pricing package",
        status: "error",
      });

      return; // prevents further execution
    }

    // db
    const students = new StudentRegistration(body);
    await students.save();

    // send email
    sendStudentRegConfirmationEmail({
      email: email,
      classStartDate: class_start_date,
      classStartTime: preferred_time,
      firstName: first_name,
      lastName: last_name,
      monthlyHours: monthlyHours,
      preferredDays: preferred_days,
      selectedPackage: pricing_package,
    });

    res
      .status(200)
      .json({ message: "registered successfully", status: "success" });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      res.status(409).json({ message: "Email is already in use" });
      return;
    }

    res
      .status(500)
      .json({ message: "student registration error from server", error });
  }
};

export default studentRegistration;
