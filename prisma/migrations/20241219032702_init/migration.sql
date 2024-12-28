/*
  Warnings:

  - You are about to drop the column `location` on the `locker` table. All the data in the column will be lost.
  - Added the required column `estruturaId` to the `Locker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estrutura` MODIFY `corredores` VARCHAR(191) NOT NULL,
    MODIFY `salas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `locker` DROP COLUMN `location`,
    ADD COLUMN `estruturaId` INTEGER NOT NULL;
