import userRepository from '../repositories/userRepository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) {
    const error = new Error('This email is already in use.');
    error.name = 'EmailAlreadyInUseError';
    throw error;
  }
}

async function signIn(params: SignInParams): Promise<Omit<SignInResult, 'password'>> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user,
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) {
    const error = new Error('invalidCredentialsError');
    error.name = 'invalidCredentialsError';
    throw error;
  }

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await userRepository.createSession({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    const error = new Error('invalidCredentialsError');
    error.name = 'invalidCredentialsError';
    throw error;
  }
}

async function getUserById(userId: string) {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('UserDoesntExist');
    error.name = 'UserDoesntExist';
    throw error;
  }

  return user;
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const userService = {
  createUser,
  signIn,
  getUserById,
};

export default userService;
