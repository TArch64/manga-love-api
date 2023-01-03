-- CreateEnum
CREATE TYPE "UserEmailStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailStatus" "UserEmailStatus" NOT NULL DEFAULT 'UNVERIFIED';
