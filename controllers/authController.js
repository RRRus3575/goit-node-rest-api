import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { registerUser, loginUser } from "../services/authServices.js";

const registerController = async(req, res, next) =>{
    const newUser = await registerUser(req.body);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const loginController = async(req, res, next) =>{
    const {token} = await loginUser(req.body)

    res.json({
        token,
    })
}

export default {
    registerController: controllerWrapper(registerController),
    loginController: controllerWrapper(loginController),
}