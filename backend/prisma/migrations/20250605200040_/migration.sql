/*
  Warnings:

  - A unique constraint covering the columns `[post_id,author_id]` on the table `PostReaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostReaction_post_id_author_id_key" ON "PostReaction"("post_id", "author_id");
