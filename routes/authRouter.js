import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema, subscribeSchema, authVerifySchema } from "../schemas/authSchemas.js";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const { 
    registerController, 
    loginController, 
    getCurrentController, 
    logoutController, 
    updateSubscribe, 
    changeAvatar, 
    vetifyController,
    recentVerifyEmailController
} = authController

const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), registerController)

authRouter.post("/login", validateBody(authLoginSchema), loginController)

authRouter.get("/verify/:verificationToken", vetifyController)

authRouter.post("/verify", validateBody(authVerifySchema), recentVerifyEmailController)

authRouter.patch("/subscription", auth, validateBody(subscribeSchema), updateSubscribe)

authRouter.get("/current", auth, getCurrentController)

authRouter.post("/logout", auth, logoutController)

authRouter.patch("/avatars", auth, upload.single("photo"), changeAvatar)


export default authRouter