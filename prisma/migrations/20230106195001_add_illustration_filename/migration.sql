/*
  Warnings:

  - Added the required column `filename` to the `Illustration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Illustration" ADD COLUMN     "filename" VARCHAR(255) NOT NULL;
