import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { registerUser, loginUser, logoutUser, updateData } from "../services/authServices.js";


const registerController = async(req, res, next) =>{
    const newUser = await registerUser(req.body);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const loginController = async(req, res, next) =>{
    const {token, payload} = await loginUser(req.body)

    res.json({
        token,
        user: {
            email: payload.email,
            subscription: payload.subscription
        }
    })
}

const logoutController = async(req, res) => {
    const {id} = req.user;
    await logoutUser(id)
    res.status(204).send()
}

const getCurrentController = (req, res)=>{
    const {email} = req.user
    res.json({
        email,
    })
}

const updateSubscribe = async(res, req) =>{
    console.log("User in request:", req.user)

    const {id} = req.user;
    const {subscription} = req.body;

    const user = await updateData(id, subscription)

    res.json({
        ...user
    })


}

export default {
    registerController: controllerWrapper(registerController),
    loginController: controllerWrapper(loginController),
    getCurrentController: controllerWrapper(getCurrentController),
    logoutController: controllerWrapper(logoutController),
    updateSubscribe: controllerWrapper(updateSubscribe),
}