/*
  Warnings:

  - Added the required column `avatarId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Illustration" ADD COLUMN     "alias" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "UserDefaultAvatar" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "index" SMALLINT NOT NULL,

    CONSTRAINT "UserDefaultAvatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDefaultAvatar_index_key" ON "UserDefaultAvatar"("index");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Illustration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDefaultAvatar" ADD CONSTRAINT "UserDefaultAvatar_id_fkey" FOREIGN KEY ("id") REFERENCES "Illustration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
