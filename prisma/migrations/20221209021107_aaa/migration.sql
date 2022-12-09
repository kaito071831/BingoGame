-- AlterTable
ALTER TABLE `User` ADD COLUMN `isBingo` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `HitPrize` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BingoNumber` (
    `number` INTEGER NOT NULL,

    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
