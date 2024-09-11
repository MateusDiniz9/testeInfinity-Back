import Joi from 'joi';

export const taskSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required(),
});
