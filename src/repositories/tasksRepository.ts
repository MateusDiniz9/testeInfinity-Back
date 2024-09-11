import { PriorityLevel, TaskStatus } from '@prisma/client';
import { prisma } from '../config/database';

async function findByUserId(userId: number) {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  return tasks;
}

async function findByTaskId(taskId: number) {
  const tasks = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  return tasks;
}

async function createTask(userId: number, title: string, description: string, priority: PriorityLevel) {
  const priorityEnum = PriorityLevel[priority as keyof typeof PriorityLevel];
  const newTask = await prisma.task.create({
    data: {
      userId,
      title,
      description,
      status: TaskStatus.TODO,
      priority: priorityEnum,
    },
  });

  return newTask;
}

async function updateTask(taskId: number, status: TaskStatus, priority: PriorityLevel) {
  const statusEnum = TaskStatus[status as keyof typeof TaskStatus];
  const priorityEnum = PriorityLevel[priority as keyof typeof PriorityLevel];
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status: statusEnum,
      priority: priorityEnum,
    },
  });

  return task;
}

async function removeTask(taskId: number) {
  const task = await prisma.task.delete({
    where: {
      id: taskId,
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
