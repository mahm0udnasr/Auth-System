import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { getUserData } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/dashboard", userAuth, getUserData);

export default userRouter;
