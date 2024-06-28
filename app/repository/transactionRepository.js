require('dotenv').config();
const { default: axios } = require('axios');
const { convertTimestampToDateTime } = require('../../libs/time');

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

      if (res.status === 200) {
        const datetime = convertTimestampToDateTime(payload.expired_time);
        const ids = payload.order_items.map((tagihan) => tagihan.tagihanId);

        const [deleteTransaksiBefore, reference, updatedTagihan] =
          await prisma.$transaction([
            prisma.transaksi.deleteMany({
              where: {
                user_id: userId,
              },
            }),
            prisma.transaksi.create({
              data: {
                reference: res.data.data.reference,
                expired: datetime,
                status: res.data.data.status,
                user_id: userId,
              },
            }),
            ...ids.map((id) =>
              prisma.tagihan.update({
                where: { id: id },
                data: {
                  status_id: 2,
                },
              })
            ),
          ]);

        return { data: res.data, reference, newTagihan: updatedTagihan };
      } else {
        throw new Error(
          'Cannot make transaction because internal server error'
        );
      }
    } catch (error) {
      console.error('Error Create Transaction:', error);
      throw new Error(`Failed to Create Transaction: ${error.message}`);
    }
  };

  getDetailTransaction = async ({ reference, prisma }) => {
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
