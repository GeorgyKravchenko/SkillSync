-- AlterTable
ALTER TABLE "CommentReaction" ADD COLUMN     "dislikes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PostReaction" ADD COLUMN     "dislikes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;
