import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import authController from "../controllers/authController.js";

const {registerController, loginController} = authController

const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), registerController)

authRouter.post("/login", validateBody(authLoginSchema), loginController)


export default authRouter