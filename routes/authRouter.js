import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema, subscribeSchema } from "../schemas/authSchemas.js";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const { registerController, loginController, getCurrentController, logoutController, updateSubscribe, changeAvatar} = authController

const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), registerController)

authRouter.post("/login", validateBody(authLoginSchema), loginController)

authRouter.patch("/subscription", auth, updateSubscribe)

authRouter.get("/current", auth, getCurrentController)

authRouter.post("/logout", auth, logoutController)

authRouter.patch("/avatar", upload.single("avatars"), changeAvatar)


export default authRouter