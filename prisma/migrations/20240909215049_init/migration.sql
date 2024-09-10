/*
  Warnings:

  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('Low', 'Medium', 'high');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "PriorityLevel" NOT NULL;
