/*
  Warnings:

  - You are about to drop the column `banner_rl` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "banner_rl",
ADD COLUMN     "banner_url" TEXT;
