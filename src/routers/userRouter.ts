import { signUp, singIn } from '../controllers/userController';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', signUp);
usersRouter.post('/sign-in', singIn);

export { usersRouter };
