import tasksService from '../services/taskService';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTasks(req: Request, res: Response) {
  const { userId } = req.body;

  try {
    const userTasks = await tasksService.getAllUserTasks(userId);
    return res.status(httpStatus.OK).send(userTasks);
  } catch (error) {
    if (error.name === 'RequestError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function taskPost(req: Request, res: Response) {
  const { userId, title, description, priority } = req.body;

  try {
    const newTask = await tasksService.postNewTask(userId, title, description, priority);
    return res.status(httpStatus.OK).send(newTask);
  } catch (error) {
    if (error.name === 'RequestError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function taskPut(req: Request, res: Response) {
  const { taskId, title, description, status, priority } = req.body;

  try {
    const taskPut = await tasksService.taskUpdate(taskId, title, description, status, priority);
    return res.status(httpStatus.OK).send(taskPut);
  } catch (error) {
    if (error.name === 'RequestError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function taskRemove(req: Request, res: Response) {
  const { taskId } = req.body;

  try {
    const taskRemove = await tasksService.removeTaskById(taskId);
    return res.status(httpStatus.OK).send(taskRemove);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND).send(error);
  }
}
