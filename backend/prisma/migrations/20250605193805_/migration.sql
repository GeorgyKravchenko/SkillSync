/*
  Warnings:

  - You are about to drop the column `dislikes_count` on the `CommentReaction` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `CommentReaction` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes_count` on the `PostReaction` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `PostReaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[comment_id,author_id]` on the table `CommentReaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "dislikes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CommentReaction" DROP COLUMN "dislikes_count",
DROP COLUMN "likes_count";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "dislikes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PostReaction" DROP COLUMN "dislikes_count",
DROP COLUMN "likes_count";

-- CreateIndex
CREATE UNIQUE INDEX "CommentReaction_comment_id_author_id_key" ON "CommentReaction"("comment_id", "author_id");
