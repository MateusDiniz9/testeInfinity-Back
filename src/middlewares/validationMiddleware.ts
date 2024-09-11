import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).send(error.details.map((d) => d.message));
    }
    next();
  };
};

export default validateSchema;
