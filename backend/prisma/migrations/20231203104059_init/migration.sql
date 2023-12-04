-- CreateTable
CREATE TABLE "UserPassword" (
    "id" SERIAL NOT NULL,
    "c_no" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_c_no_fkey" FOREIGN KEY ("c_no") REFERENCES "Customer"("c_no") ON DELETE RESTRICT ON UPDATE CASCADE;
