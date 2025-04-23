import express, { Request, Response } from "express";
import Admin from "../models/admin";

const router = express.Router();

// Get all the admin users ---- GET
router.get("/users", async (req: Request, res: Response) => {
  try {
    const adminUsers = await Admin.find().select('email');
    res.status(200).json(adminUsers);
  } catch (error) {
    console.log("Admin users error:", error);
  }
});

export default router;
