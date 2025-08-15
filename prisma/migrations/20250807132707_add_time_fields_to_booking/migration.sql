-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `endTime` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `startTime` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payments` MODIFY `currency` VARCHAR(191) NOT NULL DEFAULT 'USD';
