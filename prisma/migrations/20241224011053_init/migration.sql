/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Locker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Locker_numero_key` ON `Locker`(`numero`);
