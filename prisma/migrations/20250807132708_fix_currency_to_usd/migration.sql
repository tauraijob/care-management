-- Fix currency to always be USD
-- First update all existing records to have USD currency
UPDATE `payments` SET `currency` = 'USD' WHERE `currency` != 'USD';

-- Then change the default back to USD
ALTER TABLE `payments` MODIFY `currency` VARCHAR(191) NOT NULL DEFAULT 'USD';
