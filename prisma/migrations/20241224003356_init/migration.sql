/*
  Warnings:

  - You are about to drop the column `nome` on the `corredor` table. All the data in the column will be lost.
  - You are about to alter the column `numero` on the `locker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `nome` on the `sala` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numero]` on the table `Corredor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numero` to the `Corredor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Sala` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Corredor_nome_key` ON `corredor`;

-- AlterTable
ALTER TABLE `corredor` DROP COLUMN `nome`,
    ADD COLUMN `numero` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `locker` MODIFY `numero` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sala` DROP COLUMN `nome`,
    ADD COLUMN `numero` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Corredor_numero_key` ON `Corredor`(`numero`);
