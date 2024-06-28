const crypto = require('crypto');
const tagihanRepository = require('../repository/tagihanRepository');
const { default: axios } = require('axios');
const TransactionRepository = require('../repository/transactionRepository');
const transactionRepository = require('../repository/transactionRepository');
require('dotenv').config();

class TransactionService {
  async createSignature({ amount, invoice }) {
    const privateKey = process.env.TRIPAY_PRIVATE_KEY;
    const merchant_code = process.env.MERCHANT_CODE;
    const merchant_ref = invoice;

    const signature = crypto
      .createHmac('sha256', privateKey)
      .update(merchant_code + merchant_ref + amount)
      .digest('hex');

    return signature;
  }

  async createTransaction({
    prisma,
    data: { signature, invoice, method, total, user, tagihan },
  }) {
    try {
      const expiry = parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60);
      const merchant_ref = invoice;

      const payload = {
        method: method, //BRIVA
        merchant_ref: merchant_ref,
        amount: total,
        customer_name: user.nama,
        customer_email: user.email,
        customer_phone: user.nomor_telepon,
        order_items: tagihan.map((x) => ({
          tagihanId: x.id,
          name: x.nama,
          price: x.jumlah,
          quantity: 1,
        })),
        return_url: process.env.DOMAIN_DEVELOPMENT,
        expired_time: expiry,
        signature: signature,
      };
      const { data, reference, newTagihan } =
        await TransactionRepository.create({
          prisma,
          payload,
          userId: user.id,
        });

      return { data, reference, newTagihan };
    } catch (error) {
      console.error('Service error:', error);
      throw new Error(`Service operation failed: ${error.message}`);
    }
  }

  async getChannelPembayaran({ prisma, tagihan }) {
    try {
      const allTagihan = await tagihanRepository.getTagihansByID({
        prisma,
        tagihan,
      });

      const arrTagihan = allTagihan.map((x) => x.jumlah);
      const totalTagihan = arrTagihan.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const channelPembayaran = await tagihanRepository.getChannelPembayaran();
      channelPembayaran.data.data.map((channel) => {
        if (channel.fee_customer.percent != 0) {
          const flat_fee = Math.ceil(
            (channel.fee_customer.percent / 100) * totalTagihan
          );

          channel.fee_customer.flat += flat_fee;
          channel.fee_customer.percent = 0;
          channel.total_fee.percent = 0;
          channel.total_fee.flat = channel.fee_customer.flat;
        }
      });

      return {
        allTagihan,
        totalTagihan,
        channelPembayaran: channelPembayaran.data.data,
      };
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Service operation failed');
    }
  }

  async getDetailTransaction({ nomor_telepon, prisma }) {
    try {
      const detailTransaction =
        await transactionRepository.getDetailTransaction({
          nomor_telepon,
          prisma,
        });
      return detailTransaction.data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TransactionService();
