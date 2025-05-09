/*
  Warnings:

  - You are about to drop the column `class` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class",
ADD COLUMN     "score" INTEGER,
ALTER COLUMN "level" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender";
