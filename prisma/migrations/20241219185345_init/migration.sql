/*
  Warnings:

  - Made the column `salaId` on table `locker` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `locker` DROP FOREIGN KEY `Locker_salaId_fkey`;

-- AlterTable
ALTER TABLE `locker` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'available',
    MODIFY `salaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Locker` ADD CONSTRAINT `Locker_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `Sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
