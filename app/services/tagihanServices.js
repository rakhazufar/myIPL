const tagihanRepository = require("../repository/tagihanRepository");
const TagihanRepository = require("../repository/tagihanRepository");
const UserRepository = require("../repository/userRepository");

class TagihanService {
  async create({ prisma, reqBody }) {
    try {
      const user = await UserRepository.getByID({
        prisma,
        id: reqBody.user_id,
      });
      if (!user) {
        throw new Error("User not found");
      }

      const tagihan = await TagihanRepository.create({
        prisma,
        reqBody,
      });

      return tagihan;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Service operation failed");
    }
  }

  async getTagihan({ prisma }) {
    try {
      const tagihan = await tagihanRepository.getAll({ prisma });

      return tagihan;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Service operation failed");
    }
  }
}

module.exports = new TagihanService();
