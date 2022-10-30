/*
  Warnings:

  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('gardener', 'consumer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "location" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" STRING NOT NULL,
    "city" STRING NOT NULL,
    "image" STRING NOT NULL,
    "description" STRING NOT NULL,
    "price" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
