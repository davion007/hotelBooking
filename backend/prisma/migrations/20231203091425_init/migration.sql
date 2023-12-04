/*
  Warnings:

  - You are about to alter the column `image_url` on the `RoomImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "RoomImage" ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(255);
