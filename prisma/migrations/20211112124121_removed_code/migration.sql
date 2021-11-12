/*
  Warnings:

  - You are about to drop the `code_snippets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "code_snippets" DROP CONSTRAINT "code_snippets_postId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "githubId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "code_snippets";
