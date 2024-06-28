/*
  Warnings:

  - Added the required column `expired` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaksi" ADD COLUMN     "expired" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
