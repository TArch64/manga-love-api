-- CreateEnum
CREATE TYPE "UserActionType" AS ENUM ('VERIFY_EMAIL');

-- CreateTable
CREATE TABLE "UserAction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "UserActionType" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAction_userId_type_key" ON "UserAction"("userId", "type");

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
