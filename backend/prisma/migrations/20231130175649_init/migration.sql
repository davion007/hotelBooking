-- CreateTable
CREATE TABLE "Customer" (
    "c_no" SERIAL NOT NULL,
    "c_name" TEXT NOT NULL,
    "c_email" TEXT NOT NULL,
    "c_address" TEXT NOT NULL,
    "c_cardtype" TEXT NOT NULL,
    "c_cardexp" TEXT NOT NULL,
    "c_cardno" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("c_no")
);

-- CreateTable
CREATE TABLE "Room" (
    "r_no" SERIAL NOT NULL,
    "r_class" TEXT NOT NULL,
    "r_status" TEXT NOT NULL DEFAULT 'A',
    "r_notes" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("r_no")
);

-- CreateTable
CREATE TABLE "Rates" (
    "r_class" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "b_ref" SERIAL NOT NULL,
    "c_no" INTEGER NOT NULL,
    "b_cost" DOUBLE PRECISION NOT NULL,
    "b_outstanding" DOUBLE PRECISION NOT NULL,
    "b_notes" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("b_ref")
);

-- CreateTable
CREATE TABLE "RoomBooking" (
    "r_no" INTEGER NOT NULL,
    "b_ref" INTEGER NOT NULL,
    "checkin" TIMESTAMP(3) NOT NULL,
    "checkout" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomBooking_pkey" PRIMARY KEY ("r_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_c_no_key" ON "Customer"("c_no");

-- CreateIndex
CREATE UNIQUE INDEX "Room_r_no_key" ON "Room"("r_no");

-- CreateIndex
CREATE UNIQUE INDEX "Rates_r_class_key" ON "Rates"("r_class");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_b_ref_key" ON "Booking"("b_ref");

-- CreateIndex
CREATE UNIQUE INDEX "RoomBooking_r_no_b_ref_key" ON "RoomBooking"("r_no", "b_ref");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_c_no_fkey" FOREIGN KEY ("c_no") REFERENCES "Customer"("c_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_r_no_fkey" FOREIGN KEY ("r_no") REFERENCES "Room"("r_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_b_ref_fkey" FOREIGN KEY ("b_ref") REFERENCES "Booking"("b_ref") ON DELETE RESTRICT ON UPDATE CASCADE;
