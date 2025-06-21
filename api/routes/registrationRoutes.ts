import express from "express";
const router = express.Router();

import multer from "multer";
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

import { registerUser } from "../controllers/userRegistrationController";
import { teacherRegistration } from "../controllers/teacherRegistrationController";

router.post("/register", registerUser);

const uploadMiddleware = upload.fields([
  { name: "doc_1", maxCount: 1 },
  { name: "doc_2", maxCount: 1 },
  { name: "doc_3", maxCount: 1 },
  { name: "doc_4", maxCount: 1 },
  { name: "personal_image", maxCount: 1 },
]);

router.post("/teacher-registration", uploadMiddleware, teacherRegistration);

export default router;
