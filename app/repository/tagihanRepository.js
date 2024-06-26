require('dotenv').config();
const { default: axios } = require('axios');
class TagihanRepository {
  create = async ({ prisma, reqBody }) => {
    try {
      const { user_id, jumlah, status_id, nama } = reqBody;

      const tagihan = await prisma.tagihan.create({
        data: {
          user_id,
          jumlah,
          status_id,
          nama,
        },
      });
      return tagihan;
    } catch (error) {
      console.error('Error Get Users:', error);
      throw new Error('Failed to Get users');
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
      console.error('Error fetching tagihan:', error);
      throw error;
    }
  };

  getByNomorTelepon = async ({ nomor_telepon, prisma }) => {
    try {
      const tagihan = await prisma.tagihan.findMany({
        where: {
          user: {
            nomor_telepon: nomor_telepon,
          },
        },
        include: {
          status: true,
        },
      });

      return tagihan;
    } catch (error) {
      console.error('Error fetching tagihan:', error);
      throw error;
    }
  };

  getTagihansByID = async ({ prisma, tagihan }) => {
    try {
      const data = await prisma.tagihan.findMany({
        where: {
          id: {
            in: tagihan,
          },
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching tagihan:', error);
      throw error;
    }
  };

  getChannelPembayaran = async () => {
    const apiKey = process.env.TRIPAY_API_KEY;

    try {
      const data = await axios.get(
        `https://tripay.co.id/api-sandbox/merchant/payment-channel`,
        {
          headers: { Authorization: 'Bearer ' + apiKey },
          validateStatus: function (status) {
            return status < 999; // ignore http error
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Error Happes in service: ${error.message}`);
    }
  };
}

module.exports = new TagihanRepository();
