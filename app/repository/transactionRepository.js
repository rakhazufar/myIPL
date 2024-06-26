require('dotenv').config();
const { default: axios } = require('axios');

const apiKey = process.env.TRIPAY_API_KEY;

class TransactionRepository {
  create = async ({ prisma, payload, userId }) => {
    try {
      const res = await axios.post(
        'https://tripay.co.id/api-sandbox/transaction/create',
        payload,
        {
          headers: { Authorization: 'Bearer ' + apiKey },
          validateStatus: function (status) {
            return status < 999;
          },
        }
      );

      const reference = await prisma.transaksi.create({
        data: {
          reference: res.data.data.reference,
          user_id: userId,
        },
      });

      return { data: res.data, reference };
    } catch (error) {
      console.error('Error Create Transaction:', error);
      throw new Error(`Failed to Create Transaction: ${error.message}`);
    }
  };

  getDetailTransaction = async ({ reference }) => {
    try {
      const res = await axios.get(
        `https://tripay.co.id/api-sandbox/transaction/detail?reference=${reference}`,
        {
          headers: { Authorization: 'Bearer ' + apiKey },
          validateStatus: function (status) {
            return status < 999;
          },
        }
      );

      return res;
    } catch (error) {
      console.error('Error Create Transaction:', error);
      throw new Error(`Failed to Create Transaction: ${error.message}`);
    }
  };
}

module.exports = new TransactionRepository();
