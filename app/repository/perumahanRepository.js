class PerumahanRepository {
  constructor(PerumahanRepository) {
    this.PerumahanRepository = PerumahanRepository;
  }

  async create(prisma, { nama, alamat }) {
    const perumahan = await prisma.perumahan.create({
      data: {
        nama: nama,
        alamat: alamat,
      },
    });

    return perumahan;
  }

  async getList(prisma) {
    const perumahan = await prisma.perumahan.findMany();
    return perumahan;
  }
}

module.exports = new PerumahanRepository();
