import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import usersModel from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import apiErrors from "../utils/apiErrors.js";


const signup = asyncHandler(
  async (req, res, next) => {
    const user = await usersModel.create(req.body);
    const token = createToken(user._id);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", token, data: user });
  }
);
const login = asyncHandler(
  async (req, res, next) => {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new apiErrors("Invalid credentials", StatusCodes.UNAUTHORIZED)
    }
    const token = createToken(user._id);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Login successful", token });
  }
);
const protectRoutes = asyncHandler(
  async (req, res, next) => {
    // 1- check if token exists
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new apiErrors(
        "Please login first to access application",
        StatusCodes.UNAUTHORIZED
      )
    }
    // 2- check if token not expired
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    // 3- check if user exists
    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) {
      throw new apiErrors(
        new ApiErrors("User doesn't exist", StatusCodes.UNAUTHORIZED)
      );
    }
    // 4- check if password changed
    if (currentUser.passwordChangedAt instanceof Date) {
      const changedPasswordTime = Math.floor(
        currentUser.passwordChangedAt.getTime() / 1000
      );
      if (changedPasswordTime > decodedToken.iat) {
        throw new apiErrors(
          "Password has been changed. Please login again",
          StatusCodes.UNAUTHORIZED
        );
      }
    }
    req.user = currentUser;
    next();
  }
);
const allowedTo = (...roles) =>
  asyncHandler(
    async (req, res, next) => {
      if (!roles.includes(req.user?.role ?? "")) {
        throw new apiErrors(
          "You don't have permission to access this route",
          StatusCodes.FORBIDDEN
        )
      }
      next();
    }
  );
const checkActive = asyncHandler(
  async (req, res, next) => {
    if (!req.user?.active) {
      throw new apiErrors("Your account is not activated", StatusCodes.FORBIDDEN)
    }
    next();
  }
);

export {
  signup,
  login,
  protectRoutes,
  allowedTo,
  checkActive
};