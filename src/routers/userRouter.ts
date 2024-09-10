import { usersPost, singInPost } from '../controllers/userController';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', usersPost);
usersRouter.post('/sign-in', singInPost);

export { usersRouter };
