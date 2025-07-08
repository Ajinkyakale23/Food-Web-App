import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Define routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);  // Corrected route: Added forward slash before "login"

// Export the router
export default userRouter;
