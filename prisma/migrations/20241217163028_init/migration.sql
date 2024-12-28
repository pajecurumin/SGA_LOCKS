/*
  Warnings:

  - Added the required column `etec` to the `Estrutura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estrutura` ADD COLUMN `etec` VARCHAR(191) NOT NULL;
