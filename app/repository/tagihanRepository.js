class TagihanRepository {
  create = async ({ prisma, reqBody }) => {
    try {
      const { user_id, jumlah, status_id } = reqBody;
      console.log(user_id, jumlah, status_id);
      const tagihan = await prisma.tagihan.create({
        data: {
          user_id,
          jumlah,
          status_id,
        },
      });
      return tagihan;
    } catch (error) {
      console.error("Error Get Users:", error);
      throw new Error("Failed to Get users");
    }
  };

  getAll = async function getTagihan({ prisma }) {
    try {
      const tagihan = await prisma.tagihan.findMany({
        include: {
          user: true,
          status: true,
        },
      });
      return tagihan;
    } catch (error) {
      console.error("Error fetching tagihan:", error);
      throw error;
    }
  };
}

module.exports = new TagihanRepository();
