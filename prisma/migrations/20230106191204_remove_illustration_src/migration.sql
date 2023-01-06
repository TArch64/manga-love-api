/*
  Warnings:

  - You are about to drop the column `src` on the `Illustration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_thumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "WorkCategoryOnWork" DROP CONSTRAINT "WorkCategoryOnWork_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "WorkCategoryOnWork" DROP CONSTRAINT "WorkCategoryOnWork_workId_fkey";

-- AlterTable
ALTER TABLE "Illustration" DROP COLUMN "src";

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Illustration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkCategoryOnWork" ADD CONSTRAINT "WorkCategoryOnWork_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkCategoryOnWork" ADD CONSTRAINT "WorkCategoryOnWork_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "WorkCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
