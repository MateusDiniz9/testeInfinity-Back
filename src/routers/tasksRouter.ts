import { getTasks, taskPost, taskPut, taskRemove } from '../controllers/tasksController';
import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/', getTasks);
tasksRouter.post('/', taskPost);
tasksRouter.put('/:id', taskPut);
tasksRouter.delete('/:id', taskRemove);

export { tasksRouter };
