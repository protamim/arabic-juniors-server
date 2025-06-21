import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = async (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${b64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "teachers-registration",
    resource_type: 'auto'
  });
  return result.secure_url;
};

export const teacherRegistration = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Upload files to Cloudinary
    const uploadedFiles: Record<string, string> = {};
    const uploadFields = ["personal_image", "doc_1", "doc_2", "doc_3", "doc_4"];

    for (const field of uploadFields) {
      if (files?.[field]?.[0]) {
        const url = await uploadToCloudinary(files[field][0]);
        uploadedFiles[field] = url;
      }
    }

    // Combine all data
    const teacherData = {
      ...body,
      expected_salary: parseFloat(body.expected_salary),
      work_hours: parseFloat(body.work_hours),
      declaration: body.declaration === "true",
      other_langs: body["other_langs[]"]
        ? Array.isArray(body["other_langs[]"])
          ? body["other_langs[]"]
          : [body["other_langs[]"]]
        : [],
      ...uploadedFiles,
    };

    console.log("Final teacher data:", teacherData);

    // TODO: Save teacherData to MongoDB (if needed)

    res.status(200).json({ message: "Registration successful", teacherData });
  } catch (error) {
    console.error("teacher registration error:", error);
    res.status(500).json({
      message: "Teacher registration failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};
