import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authSchema } from "../schemas/authSchemas.js";
import authController from "../controllers/authController.js";

const {registerController} = authController

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), registerController)


export default authRouter