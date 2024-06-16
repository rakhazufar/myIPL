class PerumahanRepository {
  async create(prisma, { nama, alamat }) {
    try {
      const perumahan = await prisma.perumahan.create({
        data: {
          nama: nama,
          alamat: alamat,
        },
      });
      return perumahan;
    } catch (error) {
      console.error("Error creating perumahan:", error);
      throw new Error("Failed to create perumahan");
    }
  }

  async getList(prisma) {
    try {
      const perumahan = await prisma.perumahan.findMany();
      return perumahan;
    } catch (error) {
      console.error("Error retrieving perumahan list:", error);
      throw new Error("Failed to retrieve perumahan list");
    }
  }
}

module.exports = new PerumahanRepository();
