import User from "../db/Models/User.js";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async(data) => {
    const {email} = data;
    const user = await User.findOne({
        where: {
            email
        }
    })
    if(user){
        throw HttpError(409, "Email in use")
    }
    return User.create(data)
}