/*
  Warnings:

  - You are about to drop the column `workId` on the `WorkCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkCategory" DROP CONSTRAINT "WorkCategory_workId_fkey";

-- AlterTable
ALTER TABLE "WorkCategory" DROP COLUMN "workId";

-- CreateTable
CREATE TABLE "WorkCategoryOnWork" (
    "workId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "WorkCategoryOnWork_pkey" PRIMARY KEY ("workId","categoryId")
);

-- AddForeignKey
ALTER TABLE "WorkCategoryOnWork" ADD CONSTRAINT "WorkCategoryOnWork_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkCategoryOnWork" ADD CONSTRAINT "WorkCategoryOnWork_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "WorkCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
