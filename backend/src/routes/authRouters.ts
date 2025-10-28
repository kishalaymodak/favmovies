import express from "express";
import passport from "passport";
import {
  googleCallback,
  githubCallback,
  getCurrentUser,
  logout,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
    session: false,
  }),
  googleCallback
);

// GitHub OAuth routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_auth_failed`,
    session: false,
  }),
  githubCallback
);

// Get current user (protected route)
router.get("/me", authenticate, getCurrentUser);

// Logout
router.post("/logout", authenticate, logout);

export default router;
