/*
  Warnings:

  - Added the required column `facility` to the `RoomImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomImage" ADD COLUMN     "facility" VARCHAR(255) NOT NULL;
