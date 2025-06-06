import express from "express";
import { authenticateAdmin } from "../middleware/authMiddleware";
import {
  adminLogin,
  adminProfile,
  adminSignup,
  adminUsers,
} from "../controllers/adminControllers";

const router = express.Router();

// ALL ADMIN ---- GET
router.get("/users", authenticateAdmin, adminUsers);

// ADMIN PROFILE
router.get("/profile", authenticateAdmin, adminProfile);

// ADMIN SIGNUP ---- POST
router.post("/signup", adminSignup);

// ADMIN LOGIN --- POST
router.post("/login", adminLogin);

export default router;
