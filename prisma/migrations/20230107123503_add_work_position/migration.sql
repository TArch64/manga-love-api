/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `Work` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_thumbnailId_fkey";

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "position" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Work_position_key" ON "Work"("position");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Illustration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
