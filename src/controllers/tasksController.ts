import tasksService from '../services/taskService';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TaskStatus, PriorityLevel } from '@prisma/client';

interface UpdateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority?: PriorityLevel;
}

export async function getTasks(req: Request, res: Response) {
  const { userId } = req.query;

  try {
    const id = Number(userId);
    const userTasks = await tasksService.getAllUserTasks(id);
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
  const taskId = parseInt(req.params.id);
  const { title, description, status, priority }: UpdateTaskRequest = req.body;
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
  const taskId = parseInt(req.params.id);

  try {
    const taskRemove = await tasksService.removeTaskById(taskId);
    return res.status(httpStatus.OK).send(taskRemove);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND).send(error);
  }
}
