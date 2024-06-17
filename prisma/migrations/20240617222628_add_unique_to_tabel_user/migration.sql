/*
  Warnings:

  - A unique constraint covering the columns `[nomor_telepon]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_nomor_telepon_key" ON "User"("nomor_telepon");
