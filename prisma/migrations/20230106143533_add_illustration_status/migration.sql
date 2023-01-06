/*
  Warnings:

  - Added the required column `status` to the `Illustration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IllustrationStatus" AS ENUM ('UPLOADING', 'UPLOADED');

-- AlterTable
ALTER TABLE "Illustration" ADD COLUMN     "status" "IllustrationStatus" NOT NULL;
