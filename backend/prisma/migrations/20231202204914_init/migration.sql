/*
  Warnings:

  - The primary key for the `RoomBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RoomBooking" DROP CONSTRAINT "RoomBooking_pkey",
ADD CONSTRAINT "RoomBooking_pkey" PRIMARY KEY ("b_ref");
