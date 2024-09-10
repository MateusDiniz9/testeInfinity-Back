import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function createSession(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findById(userId: string) {
  const id = parseInt(userId);
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  createSession,
  findById,
};

export default userRepository;
