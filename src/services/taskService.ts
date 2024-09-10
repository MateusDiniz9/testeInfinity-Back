import { Task, TaskStatus, PriorityLevel } from '@prisma/client';
import tasksRepository from '../repositories/tasksRepository';
import userService from './userSevice';
import { notFoundError } from '../error/error';

async function getAllUserTasks(userId: string): Promise<Task[]> {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw notFoundError();
  }
  const tasks = await tasksRepository.findByUserId(userId);
  if (!tasks) {
    throw notFoundError();
  }
  return tasks;
}

async function postNewTask(userId: string, title: string, description: string, priority: PriorityLevel): Promise<Task> {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw notFoundError();
  }
  const task = await tasksRepository.createTask(userId, title, description, priority);

  return task;
}

async function taskUpdate(taskId: string, title: string, description: string, status: TaskStatus, priority: PriorityLevel): Promise<Task> {
  const hasTask = await tasksRepository.findByTaskId(taskId);
  if (!hasTask) {
    throw notFoundError();
  }
  const updatedTask = await tasksRepository.updateTask(taskId, title, description, status, priority);

  return updatedTask;
}

async function removeTaskById(taskId: string): Promise<Task> {
  const hasTask = await tasksRepository.findByTaskId(taskId);
  if (!hasTask) {
    throw notFoundError();
  }
  const removeTask = await tasksRepository.removeTask(taskId);

  return removeTask;
}

const tasksService = {
  getAllUserTasks,
  postNewTask,
  taskUpdate,
  removeTaskById,
};

export default tasksService;
