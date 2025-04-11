import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const {registerController, loginController, getCurrentController, logoutController} = authController

const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), registerController)

authRouter.post("/login", validateBody(authLoginSchema), loginController)

authRouter.get("/current", auth, getCurrentController)

authRouter.post("/logout", auth, logoutController)


export default authRouter