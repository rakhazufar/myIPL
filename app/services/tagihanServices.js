const TagihanRepository = require('../repository/tagihanRepository');
const UserRepository = require('../repository/userRepository');

class TagihanService {
  async create({ prisma, reqBody }) {
    try {
      const user = await UserRepository.getByID({
        prisma,
        id: reqBody.user_id,
      });
      if (!user) {
        throw new Error('User not found');
      }

      const tagihan = await TagihanRepository.create({
        prisma,
        reqBody,
      });

      return tagihan;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Service operation failed');
    }
  }

  async getTagihan({ prisma }) {
    try {
      const tagihan = await TagihanRepository.getAll({ prisma });

      return tagihan;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Service operation failed');
    }
  }

  async getTagihanByNomorTlp({ nomor_telepon, prisma }) {
    try {
      if (!nomor_telepon) {
        const error = new Error();
        error.name = 'INVALID_INPUT';
        throw error;
      }

      const tagihan = await TagihanRepository.getByNomorTelepon({
        nomor_telepon,
        prisma,
      });

      if (tagihan.length === 0) {
        const error = new Error();
        error.name = 'USER_NOT_FOUND';
        throw error;
      }

      return tagihan;
    } catch (error) {
      if (error.name == 'USER_NOT_FOUND') {
        throw new Error('User not found');
      } else if (error.name == 'INVALID_INPUT') {
        throw new Error('Input invalid');
      } else {
        console.error('Service error:', error.message);
        throw new Error('Service operation failed');
      }
    }
  }
}

module.exports = new TagihanService();
