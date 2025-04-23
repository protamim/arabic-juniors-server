import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Users doc find error", error);
  }
});


export default router;
