import { authenticateToken } from '../middlewares/authenticationMiddleware';
import { getTasks, taskPost, taskPut, taskRemove } from '../controllers/tasksController';
import { Router } from 'express';
import validateSchema from '../middlewares/validationMiddleware';
import { taskSchema } from '../schemas/taskSchemas';

const tasksRouter = Router();

tasksRouter.get('/', authenticateToken, getTasks);
tasksRouter.post('/', authenticateToken, validateSchema(taskSchema), taskPost);
tasksRouter.put('/:id', authenticateToken, taskPut);
tasksRouter.delete('/:id', authenticateToken, taskRemove);

export { tasksRouter };
