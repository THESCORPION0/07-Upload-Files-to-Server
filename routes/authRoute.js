import { Router } from "express";
import { login, signup } from "../controllers/auth.js";
import { loginValidator, signupValidator } from "../utils/validation/authValidation.js";

const authRoute = Router();

authRoute.route("/signup").post(signupValidator, signup);
authRoute.route("/login").post(loginValidator, login);

export default authRoute;