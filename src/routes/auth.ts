import express, { NextFunction, type Request, type Response } from "express";
import User from "../models/users";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

// signup
router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ email: email, passwordHash: hash });
  // save to the DB
  await newUser.save();

  // everything OK
  res.status(201).json({ message: "User created!" });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Logged in!", user });
    });
  })(req, res, next);
});

export default router;
