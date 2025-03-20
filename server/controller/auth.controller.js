import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "fill all fields" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.DEV_MODE === "production",
      sameSite: process.env.DEV_MODE === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Auth System",
      html: `
      <p>Hello ${email}</p>
      <p>Your account has been created</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "fill all fields" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.DEV_MODE === "production",
      sameSite: process.env.DEV_MODE === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.DEV_MODE === "production",
      sameSite: process.env.DEV_MODE === "production" ? "none" : "strict",
    });
    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.isVerify) {
      return res
        .status(404)
        .json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Verification OTP sent on email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.status(404).json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(404).json({ success: false, message: "OTP Expired" });
    }
    user.isVerify = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Account OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Reset OTP sent on email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyResetOtp = async (req, res) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    return res.status(404).json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(404).json({ success: false, message: "OTP Expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
