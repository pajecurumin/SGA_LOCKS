/*
  Warnings:

  - You are about to drop the column `lockerId` on the `estrutura` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the column `estruturaId` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the column `etec` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `estrutura` DROP FOREIGN KEY `Estrutura_lockerId_fkey`;

-- AlterTable
ALTER TABLE `estrutura` DROP COLUMN `lockerId`;

-- AlterTable
ALTER TABLE `locker` DROP COLUMN `endDate`,
    DROP COLUMN `estruturaId`,
    DROP COLUMN `etec`,
    DROP COLUMN `startDate`,
    ALTER COLUMN `status` DROP DEFAULT;

-- DropTable
DROP TABLE `admin`;

-- CreateTable
CREATE TABLE `LockerEstrutura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `etec` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `estruturaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LockerEstrutura` ADD CONSTRAINT `LockerEstrutura_estruturaId_fkey` FOREIGN KEY (`estruturaId`) REFERENCES `Estrutura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
