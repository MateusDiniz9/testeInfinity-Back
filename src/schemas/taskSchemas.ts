import Joi from 'joi';

export const taskSchema = Joi.object({
  userId: Joi.required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  priority: Joi.string().required(),
});
