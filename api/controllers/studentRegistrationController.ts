import type { Request, Response } from "express";
import { StudentRegistrationFormTypes } from "../types";
import StudentRegistration from "../models/studentRegistration";

const studentRegistration = async (req: Request, res: Response) => {
  const body: StudentRegistrationFormTypes = req.body;

  try {
    const {
      class_grade,
      class_start_date,
      class_type,
      email,
      first_name,
      last_name,
      phone_number,
      preferred_days,
      preferred_time,
      pricing_package,
      school_name,
    } = body;

    // db
    const students = new StudentRegistration(body);
    await students.save();

    res
      .status(200)
      .json({ message: "registered successfully", status: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "student registration error from server", error });
  }
};

export default studentRegistration;
