-- CreateTable
CREATE TABLE "RoomImage" (
    "id" SERIAL NOT NULL,
    "r_no" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "RoomImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomImage" ADD CONSTRAINT "RoomImage_r_no_fkey" FOREIGN KEY ("r_no") REFERENCES "Room"("r_no") ON DELETE RESTRICT ON UPDATE CASCADE;
