import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middleware/error.middleware";

const r = Router();

r.post(
    "/register", // 1. Endpoint POST /register
    body("email").isEmail().withMessage("Email is invalid"), // 2. Valid email?
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"), //3. Password with at least 6 characters
    validate, // 4. Middleware
    register // 5. Function
);

r.post(
    "/login", // 1. Endpoint POST /login
    body("email").isEmail(), // 2. Valid email?
    body("password").isString(),  //3. Is password a String?
    validate, // 4. Middleware
    login // 5. Function
);

export default r;