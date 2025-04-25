import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { registerUser, loginUser, logoutUser, updateData, verifyUser, recendVerifyEmail } from "../services/authServices.js";
import generateGravatarUrl from "../helpers/generateGravatar.js";
import fs from "node:fs/promises";
import path from "node:path"


const posterDir = path.resolve("public", "avatars")

const registerController = async(req, res, next) =>{
    const avatarURL = await generateGravatarUrl(req.body.email)
    const newUser = await registerUser({...req.body, avatarURL});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
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
    const {email, subscription} = req.user
    console.log(req.user)
    res.json({
        email,
        subscription
    })
}

const updateSubscribe = async(req, res) =>{
    
    const {id} = req.user;
    const {subscription} = req.body;

    console.log("subscription", subscription)

    if(!subscription){
        return res.status(400).json({ message: "Body must have 'subscription'" })
    }

    const user = await updateData(id, {subscription})

    res.json({
        user:{
            email: user.email,
            subscription: user.subscription,
        }
    })
}


const changeAvatar = async(req, res) =>{
    const {id} = req.user;
    let avatarURL = null
    if(req.file) {
        const oldAvatarURL = req.user.avatarURL;
        if (oldAvatarURL && !oldAvatarURL.startsWith("https://")) {
            const publicPath = path.resolve("public");
            const oldFilePath = path.join(publicPath, oldAvatarURL);
            try {
                await fs.access(oldFilePath)
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.warn("Old avatar not found or couldn't delete") 
            }
        }

        const {path: oldPath, filename} = req.file;
        const newPath = path.join(posterDir, filename)
        await fs.rename(oldPath, newPath)
        avatarURL = path.join("avatars",  filename)

    }
    const user = await updateData(id, {avatarURL})

    res.status(200).json({
        avatarURL: user.avatarURL.replace(/\\/g, "/"),
    })
}

const vetifyController = async (req, res) => {
    const {verificationToken} = req.params;
    console.log("verificationCode", verificationToken)
    await verifyUser(verificationToken)

    res.json({
        message: "Verification successful"
    })

}

const recentVerifyEmailController = async(req, res) =>{
  const {email} = req.body;
  console.log("email", email)
  if(!email) {
    throw HttpError(400, "missing required field email")
  }
  await recendVerifyEmail(email)

  res.json({
    email,
  })

}

export default {
    registerController: controllerWrapper(registerController),
    loginController: controllerWrapper(loginController),
    getCurrentController: controllerWrapper(getCurrentController),
    logoutController: controllerWrapper(logoutController),
    updateSubscribe: controllerWrapper(updateSubscribe),
    changeAvatar: controllerWrapper(changeAvatar),
    vetifyController: controllerWrapper(vetifyController),
    recentVerifyEmailController: controllerWrapper(recentVerifyEmailController),
}