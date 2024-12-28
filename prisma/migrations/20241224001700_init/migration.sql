/*
  Warnings:

  - You are about to drop the column `etec` on the `admin` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `resetToken` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `approvalToken` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `estruturaId` on the `corredor` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `locker` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Sobrenome` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `etec` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `estrutura` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Corredor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Corredor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Locker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Locker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobrenome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `corredor` DROP FOREIGN KEY `Corredor_estruturaId_fkey`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `etec`,
    MODIFY `admin` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `resetToken` VARCHAR(191) NULL,
    MODIFY `approvalToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `corredor` DROP COLUMN `estruturaId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `locker` DROP COLUMN `number`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `numero` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sala` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Nome`,
    DROP COLUMN `Sobrenome`,
    DROP COLUMN `etec`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `sobrenome` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `estrutura`;

-- CreateIndex
CREATE UNIQUE INDEX `Corredor_nome_key` ON `Corredor`(`nome`);
