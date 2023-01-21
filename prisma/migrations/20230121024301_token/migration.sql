-- DropIndex
DROP INDEX `RefreshToken_userId_fkey` ON `RefreshToken`;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `token` VARCHAR(500) NOT NULL;
