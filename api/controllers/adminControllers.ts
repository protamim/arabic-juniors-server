import { Request, Response } from "express";
import generateJwtToken from "../utils/generateJwtToken";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";
import { isProduction } from "..";

// LOGIN CONTROLLER
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      res.status(401).json({ message: "Invalid Email!" });
      return;
    }

    const passMatch = await bcrypt.compare(password, adminUser.passwordHash);
    if (!passMatch) {
      res.status(401).json({ message: "Incorrect Password!" });
      return;
    }

    // console.log("admin ID:", adminUser._id.toString());
    const token = await generateJwtToken({ adminId: adminUser._id.toString() });
    console.log("jwt token", token);

    // sent the cookie to client
    const clientHostname = new URL(process.env.CLIENT_URL as string).hostname;
    const baseDomain = clientHostname.startsWith("www.")
      ? clientHostname.substring(4)
      : clientHostname;

    res.cookie("jwtToken", token, {
      domain: `.${baseDomain}`, // Leading dot for all subdomains
      httpOnly: isProduction ? true : false, // JavaScript can't access in production
      secure: isProduction ? true : false, // Only send over HTTPS in production
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({ message: "Logged in successfully!", token: token });
  } catch (error) {
    console.error("Login failed!", error);
    res.status(500).json({ message: "Login failed!" });
  }
};

// SIGN UP CONTROLLER
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      res.status(400).json({ message: "User already exists" });
      return; // making sure no further execution
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new Admin({ email: email, passwordHash: hash });
    // save to the DB
    await newUser.save();

    // everything OK
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during Sign-Up" });
  }
};

// ALL ADMIN
export const adminUsers = async (req: Request, res: Response) => {
  try {
    const adminUsers = await Admin.find();
    res.status(200).json(adminUsers);
  } catch (error) {
    console.log("Admin users error:", error);
  }
};

// ADMIN PROFILE CONTROLLER
interface AdminProfileRequest extends Request {
  adminId?: string;
}

export const adminProfile = async (req: AdminProfileRequest, res: Response) => {
  res.status(200).json({ adminId: req.adminId, success: true });
};


// ADMIN LOGOUT
export const adminLogout = (req: Request, res: Response) => {
  try {
    const clientHostname = new URL(process.env.CLIENT_URL as string).hostname;
    const baseDomain = clientHostname.startsWith("www.")
      ? clientHostname.substring(4)
      : clientHostname;

    res.clearCookie("jwtToken", {
      domain: `.${baseDomain}`,     // match domain
      httpOnly: isProduction ? true : false,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout failed:", err);
    res.status(500).json({ message: "Logout error" });
  }
};
