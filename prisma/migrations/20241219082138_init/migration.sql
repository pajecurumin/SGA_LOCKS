/*
  Warnings:

  - You are about to drop the column `corredores` on the `estrutura` table. All the data in the column will be lost.
  - You are about to drop the column `salas` on the `estrutura` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the `lockerestrutura` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lockerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `locker` DROP FOREIGN KEY `Locker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `lockerestrutura` DROP FOREIGN KEY `LockerEstrutura_estruturaId_fkey`;

-- DropIndex
DROP INDEX `Locker_userId_key` ON `locker`;

-- AlterTable
ALTER TABLE `estrutura` DROP COLUMN `corredores`,
    DROP COLUMN `salas`;

-- AlterTable
ALTER TABLE `locker` DROP COLUMN `userId`,
    ADD COLUMN `salaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lockerId` INTEGER NULL;

-- DropTable
DROP TABLE `lockerestrutura`;

-- CreateTable
CREATE TABLE `Corredor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `estruturaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `corredorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `etec` VARCHAR(191) NOT NULL DEFAULT 'default_etec',
    `resetToken` VARCHAR(255) NULL,
    `approvalToken` VARCHAR(255) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_admin_key`(`admin`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_lockerId_key` ON `User`(`lockerId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lockerId_fkey` FOREIGN KEY (`lockerId`) REFERENCES `Locker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locker` ADD CONSTRAINT `Locker_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `Sala`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Corredor` ADD CONSTRAINT `Corredor_estruturaId_fkey` FOREIGN KEY (`estruturaId`) REFERENCES `Estrutura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala` ADD CONSTRAINT `Sala_corredorId_fkey` FOREIGN KEY (`corredorId`) REFERENCES `Corredor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
