/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Locker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Locker_userId_key` ON `Locker`(`userId`);
