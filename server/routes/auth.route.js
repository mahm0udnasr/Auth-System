import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  verifyResetOtp,
} from "../controller/auth.controller.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

authRouter.post("/verify-account", userAuth, verifyEmail);

authRouter.post("/is-auth", userAuth, isAuthenticated);

authRouter.post("/send-reset-otp", sendResetOtp);

authRouter.post("/verify-reset-otp", verifyResetOtp);

export default authRouter;
