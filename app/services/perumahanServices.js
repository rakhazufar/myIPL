const PerumahanRepository = require("../repository/perumahanRepository");

class PerumahanService {
  async create(prisma, reqbody) {
    const { nama, alamat } = reqbody;
    try {
      const perumahan = await PerumahanRepository.create(prisma, {
        nama,
        alamat,
      });
      return perumahan;
    } catch (error) {
      console.error("Error creating perumahan in service:", error);
      throw new Error("Service failed to create perumahan");
    }
  }

  async getList(prisma) {
    try {
      const perumahan = await PerumahanRepository.getList(prisma);
      return perumahan;
    } catch (error) {
      console.error("Error retrieving perumahan list in service:", error);
      throw new Error("Service failed to retrieve perumahan list");
    }
  }
}

module.exports = new PerumahanService();
