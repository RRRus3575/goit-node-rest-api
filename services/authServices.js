import User from "../db/Models/User.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt.js";


export const registerUser = async(data) => {
    const {email, password} = data;
    const user = await User.findOne({
        where: {
            email
        }
    })
    if(user){
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)


    return User.create({...data, password: hashPassword})
}


export const loginUser = async(data) => {
    const {email, password} = data;
    const user = await User.findOne({
        where: {
            email
        }
    })

    if(!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        email,
        subscription: user.subscription
            
    }

    const token = generateToken(payload)

    await user.update({token});

    return {token, payload};
}


export const findUser = query => User.findOne({
    where: query
})


export const logoutUser = async(id)=>{
    const user = await findUser({id})
    if(!user || !user.token) {
        throw HttpError(401, "Not authorized")
    }

    await user.update({token: null});

}

export const updateData = async(id, subscription) => {
    const user = await findUser({id})
    if(!user || !user.token) {
        throw HttpError(401, "Not authorized")
    }

    console.log("data", subscription)

    await user.update({subscription})

    return user
}