/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_admin` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `id_role` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Cluster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_cluster` on the `Cluster` table. All the data in the column will be lost.
  - You are about to drop the column `id_pengelola` on the `Cluster` table. All the data in the column will be lost.
  - You are about to drop the column `id_perumahan` on the `Cluster` table. All the data in the column will be lost.
  - The primary key for the `Pembayaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_pembayaran` on the `Pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `id_tagihan` on the `Pembayaran` table. All the data in the column will be lost.
  - The primary key for the `Perumahan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_perumahan` on the `Perumahan` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_role` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `StatusTagihan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_status` on the `StatusTagihan` table. All the data in the column will be lost.
  - The primary key for the `Tagihan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_status` on the `Tagihan` table. All the data in the column will be lost.
  - You are about to drop the column `id_tagihan` on the `Tagihan` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Tagihan` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_cluster` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `User` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengelola_id` to the `Cluster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perumahan_id` to the `Cluster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagihan_id` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Tagihan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tagihan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cluster_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_id_role_fkey";

-- DropForeignKey
ALTER TABLE "Cluster" DROP CONSTRAINT "Cluster_id_pengelola_fkey";

-- DropForeignKey
ALTER TABLE "Cluster" DROP CONSTRAINT "Cluster_id_perumahan_fkey";

-- DropForeignKey
ALTER TABLE "Pembayaran" DROP CONSTRAINT "Pembayaran_id_tagihan_fkey";

-- DropForeignKey
ALTER TABLE "Tagihan" DROP CONSTRAINT "Tagihan_id_status_fkey";

-- DropForeignKey
ALTER TABLE "Tagihan" DROP CONSTRAINT "Tagihan_id_user_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_cluster_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "id_admin",
DROP COLUMN "id_role",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Cluster" DROP CONSTRAINT "Cluster_pkey",
DROP COLUMN "id_cluster",
DROP COLUMN "id_pengelola",
DROP COLUMN "id_perumahan",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "pengelola_id" INTEGER NOT NULL,
ADD COLUMN     "perumahan_id" INTEGER NOT NULL,
ADD CONSTRAINT "Cluster_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pembayaran" DROP CONSTRAINT "Pembayaran_pkey",
DROP COLUMN "id_pembayaran",
DROP COLUMN "id_tagihan",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "tagihan_id" INTEGER NOT NULL,
ADD CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Perumahan" DROP CONSTRAINT "Perumahan_pkey",
DROP COLUMN "id_perumahan",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Perumahan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id_role",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StatusTagihan" DROP CONSTRAINT "StatusTagihan_pkey",
DROP COLUMN "id_status",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StatusTagihan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tagihan" DROP CONSTRAINT "Tagihan_pkey",
DROP COLUMN "id_status",
DROP COLUMN "id_tagihan",
DROP COLUMN "id_user",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id_cluster",
DROP COLUMN "id_user",
ADD COLUMN     "cluster_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_perumahan_id_fkey" FOREIGN KEY ("perumahan_id") REFERENCES "Perumahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_pengelola_id_fkey" FOREIGN KEY ("pengelola_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "Cluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusTagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_tagihan_id_fkey" FOREIGN KEY ("tagihan_id") REFERENCES "Tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
