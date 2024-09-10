import userService from '../services/userSevice';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userSchema } from '../schemas/userSchemas';

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { error } = userSchema.validate({ email, password });
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }

    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'EmailAlreadyInUseError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { error } = userSchema.validate({ email, password });

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }

    const result = await userService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error });
  }
}
