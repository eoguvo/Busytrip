import { ROLES } from './../config/index';
import Joi, { Schema } from "joi";

const phoneRegex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
// (11) 91234-5678

const companyDataSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required().strict(),
  phone: Joi.string().min(15).max(15).pattern(phoneRegex).required(),
  bio: Joi.string().max(180),
  avatar_url: Joi.string().uri(),
  techs: Joi.array().items(Joi.string()),
  role: Joi.string().valid(...Object.keys(ROLES).filter(x => !(parseInt(x) >= 0))),
  location: {
    coordinates: Joi.array().ordered(
      Joi.number().min(-90).max(90).required(), 
      Joi.number().min(-180).max(180).required()
    )}
})

const userDataSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required().strict(),
})

const feedbackDataSchema = Joi.object({
  company_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  ratings: Joi.number().min(0).max(5).required(),
  body: Joi.string().max(140).required()
})

export default {
  '/company': companyDataSchema,
  '/user': userDataSchema,
  '/feedback': feedbackDataSchema
} as { [key: string]: Schema };