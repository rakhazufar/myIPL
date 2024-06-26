/*
  Warnings:

  - You are about to drop the `Pembayaran` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama` to the `Tagihan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pembayaran" DROP CONSTRAINT "Pembayaran_tagihan_id_fkey";

-- AlterTable
ALTER TABLE "Tagihan" ADD COLUMN     "nama" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" VARCHAR(25) NOT NULL;

-- DropTable
DROP TABLE "Pembayaran";

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
