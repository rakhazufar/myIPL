const PerumahanRepository = require("../repository/perumahanRepository");

class PerumahanService {
  constructor(PerumahanService) {
    this.PerumahanService = PerumahanService;
  }

  async create(prisma, reqbody) {
    const { nama, alamat } = reqbody;
    const perumahan = await PerumahanRepository.create(prisma, {
      nama,
      alamat,
    });

    return perumahan;
  }

  async getList(prisma) {
    const perumahan = await PerumahanRepository.getList(prisma);
    return perumahan;
  }
}

module.exports = new PerumahanService();
