import Joi from "joi";
import { emailRegex, PLAN_TYPES } from "../constants/auth.js";

export const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid(...PLAN_TYPES).default("starter"),
})

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
})


