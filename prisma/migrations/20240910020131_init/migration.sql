/*
  Warnings:

  - The values [Low,Medium,high] on the enum `PriorityLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [Done,ToDo,InProgress] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PriorityLevel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "PriorityLevel_new" USING ("priority"::text::"PriorityLevel_new");
ALTER TYPE "PriorityLevel" RENAME TO "PriorityLevel_old";
ALTER TYPE "PriorityLevel_new" RENAME TO "PriorityLevel";
DROP TYPE "PriorityLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('DONE', 'TODO', 'INPROGRESS');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;
