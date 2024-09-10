import { PriorityLevel, TaskStatus } from '@prisma/client';
import { prisma } from '../config/database';

async function findByUserId(userId: string) {
  const id = parseInt(userId);
  const tasks = await prisma.task.findMany({
    where: {
      userId: id,
    },
  });

  return tasks;
}

async function findByTaskId(taskId: string) {
  const id = parseInt(taskId);
  const tasks = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  return tasks;
}

async function createTask(userId: string, title: string, description: string, priority: PriorityLevel) {
  const id = parseInt(userId);
  const priorityEnum = PriorityLevel[priority as keyof typeof PriorityLevel];
  const newTask = await prisma.task.create({
    data: {
      userId: id,
      title,
      description,
      status: TaskStatus.TODO,
      priority: priorityEnum,
    },
  });

  return newTask;
}

async function updateTask(taskId: string, title: string, description: string, status: TaskStatus, priority: PriorityLevel) {
  const id = parseInt(taskId);
  const statusEnum = TaskStatus[status as keyof typeof TaskStatus];
  const priorityEnum = PriorityLevel[priority as keyof typeof PriorityLevel];
  const task = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      status: statusEnum,
      priority: priorityEnum,
    },
  });

  return task;
}

async function removeTask(taskId: string) {
  const id = parseInt(taskId);
  const task = await prisma.task.delete({
    where: {
      id: id,
    },
  });

  return task;
}

const tasksRepository = {
  findByUserId,
  createTask,
  findByTaskId,
  updateTask,
  removeTask,
};

export default tasksRepository;
