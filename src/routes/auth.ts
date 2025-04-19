import express, { NextFunction, Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

// signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ message: "User already exists" });
      return; // making sure no further execution
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email: email, passwordHash: hash });
    // save to the DB
    await newUser.save();

    // everything OK
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during Sign-Up" });
  }
});

// Login
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

// Log Out
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged Out!" });
  });
});

router.get("/auth/admin", (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = { id: req.user._id, email: req.user?.email };

    res.status(200).json({ user });
    return;
  }

  res.status(401).json({ message: "Not authenticated" });
});

export default router;
