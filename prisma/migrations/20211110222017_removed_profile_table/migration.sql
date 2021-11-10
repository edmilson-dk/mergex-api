/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubProfile` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "githubProfile" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "profiles";
