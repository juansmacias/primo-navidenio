/*
  Warnings:

  - A unique constraint covering the columns `[tipId,userId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Answer_tipId_userId_key` ON `Answer`(`tipId`, `userId`);
