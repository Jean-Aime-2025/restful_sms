/*
  Warnings:

  - The `level` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('LEVEL_1', 'LEVEL_2', 'LEVEL_3');

-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "level",
ADD COLUMN     "level" "Level";
