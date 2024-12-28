/*
  Warnings:

  - Added the required column `period` to the `Locker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `locker` ADD COLUMN `period` VARCHAR(191) NOT NULL;
