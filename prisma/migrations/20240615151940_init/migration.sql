-- CreateTable
CREATE TABLE "Perumahan" (
    "id_perumahan" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,

    CONSTRAINT "Perumahan_pkey" PRIMARY KEY ("id_perumahan")
);

-- CreateTable
CREATE TABLE "Cluster" (
    "id_cluster" SERIAL NOT NULL,
    "id_perumahan" INTEGER NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "id_pengelola" INTEGER NOT NULL,

    CONSTRAINT "Cluster_pkey" PRIMARY KEY ("id_cluster")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "id_cluster" INTEGER NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "nomor_telepon" VARCHAR(15) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "nomor_telepon" VARCHAR(15) NOT NULL,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Role" (
    "id_role" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "StatusTagihan" (
    "id_status" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "StatusTagihan_pkey" PRIMARY KEY ("id_status")
);

-- CreateTable
CREATE TABLE "Tagihan" (
    "id_tagihan" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "id_status" INTEGER NOT NULL,

    CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id_tagihan")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id_pembayaran" SERIAL NOT NULL,
    "id_tagihan" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "metode_pembayaran" VARCHAR(50) NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id_pembayaran")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_id_perumahan_fkey" FOREIGN KEY ("id_perumahan") REFERENCES "Perumahan"("id_perumahan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_id_pengelola_fkey" FOREIGN KEY ("id_pengelola") REFERENCES "Admin"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_cluster_fkey" FOREIGN KEY ("id_cluster") REFERENCES "Cluster"("id_cluster") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "StatusTagihan"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_id_tagihan_fkey" FOREIGN KEY ("id_tagihan") REFERENCES "Tagihan"("id_tagihan") ON DELETE RESTRICT ON UPDATE CASCADE;
