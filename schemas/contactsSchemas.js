import Joi from "joi";
import { phonePattern } from "../constants/contact.js";

export const createContactSchema = Joi.object({
    name: Joi.string().required(), 
    email: Joi.string().email().required(), 
    phone: Joi.string().pattern(phonePattern).required(),
    favorite: Joi.boolean(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(), 
    email: Joi.string().email(), 
    phone: Joi.string().pattern(phonePattern),
    favorite: Joi.boolean(),
})

export const updateFavotiteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})