import User from "../db/Models/User.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {JWT_SECRET} =process.env;



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

    const token = jwt.sign({email}, JWT_SECRET,{
        expiresIn: "24h"
    })

    return {token};
}