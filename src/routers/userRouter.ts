import { signUp, singIn } from '../controllers/userController';
import { Router } from 'express';
import { userSchema } from '../schemas/userSchemas';
import validateSchema from '../middlewares/validationMiddleware';

const usersRouter = Router();

usersRouter.post('/', validateSchema(userSchema), signUp);
usersRouter.post('/sign-in', validateSchema(userSchema), singIn);

export { usersRouter };
