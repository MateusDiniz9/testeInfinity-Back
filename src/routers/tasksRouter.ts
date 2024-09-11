import { authenticateToken } from '../middlewares/authenticationMiddleware';
import { getTasks, taskPost, taskPut, taskRemove } from '../controllers/tasksController';
import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/', authenticateToken, getTasks);
tasksRouter.post('/', authenticateToken, taskPost);
tasksRouter.put('/:id', authenticateToken, taskPut);
tasksRouter.delete('/:id', authenticateToken, taskRemove);

export { tasksRouter };
