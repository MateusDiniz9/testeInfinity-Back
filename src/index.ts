import { connectDb, disconnectDB } from './config/database';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { usersRouter } from './routers/userRouter';
import { tasksRouter } from './routers/tasksRouter';

dotenv.config();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/tasks', tasksRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

const port = process.env.PORT || 4000;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});

export default app;
