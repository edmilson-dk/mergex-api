/*
  Warnings:

  - You are about to drop the column `createdAt` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `followedId` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bannerUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `githubProfile` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `githubUsername` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `PostDisLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_comments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[github_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,github_id,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followed_id` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_id` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_profile` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostDisLikes" DROP CONSTRAINT "PostDisLikes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostDisLikes" DROP CONSTRAINT "PostDisLikes_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLikes" DROP CONSTRAINT "PostLikes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostLikes" DROP CONSTRAINT "PostLikes_postId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followedId_fkey";

-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followerId_fkey";

-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropIndex
DROP INDEX "users_githubId_key";

-- DropIndex
DROP INDEX "users_githubUsername_key";

-- DropIndex
DROP INDEX "users_username_githubId_email_key";

-- AlterTable
ALTER TABLE "followers" DROP COLUMN "createdAt",
DROP COLUMN "followedId",
DROP COLUMN "followerId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "followed_id" TEXT NOT NULL,
ADD COLUMN     "follower_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
DROP COLUMN "bannerUrl",
DROP COLUMN "createdAt",
DROP COLUMN "dateOfBirth",
DROP COLUMN "githubId",
DROP COLUMN "githubProfile",
DROP COLUMN "githubUsername",
DROP COLUMN "isDisabled",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "banner_rl" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "github_id" TEXT NOT NULL,
ADD COLUMN     "github_profile" TEXT NOT NULL,
ADD COLUMN     "github_username" VARCHAR(255) NOT NULL,
ADD COLUMN     "is_disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "PostDisLikes";

-- DropTable
DROP TABLE "PostLikes";

-- DropTable
DROP TABLE "post_comments";

-- CreateTable
CREATE TABLE "posts_likes" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_dislikes" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_dislikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_github_username_key" ON "users"("github_username");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_github_id_email_key" ON "users"("username", "github_id", "email");

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts_comments" ADD CONSTRAINT "posts_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
