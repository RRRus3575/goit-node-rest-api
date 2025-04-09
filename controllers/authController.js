import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { registerUser } from "../services/authServices.js";

const registerController = async(req, res, next) =>{
    const newUser = await registerUser(req.body);

    res.status(201).json({
        email: newUser.email,
        subscription:  "starter",
    })
}

export default {
    registerController: controllerWrapper(registerController),
}