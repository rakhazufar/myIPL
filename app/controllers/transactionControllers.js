const { generateInvoice } = require('../../libs/invoice');
const userRepository = require('../repository/userRepository');
const transactionServices = require('../services/transactionServices');
const { ApplicationControllers } = require('./applicationControllers');
require('dotenv').config();

class TransactionControllers extends ApplicationControllers {
  create = async (req, res) => {
    try {
      const inv = generateInvoice();
      const { method, nomor_telepon, tagihan } = req.body;

      const tagihans = tagihan.map((x) => x.jumlah);
      const total = tagihans.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const signature = await transactionServices.createSignature({
        amount: total,
        invoice: inv,
      });

      const user = await userRepository.getByNomorTelepon({
        prisma: req.prisma,
        nomor_telepon,
      });

      const { data, reference } = await transactionServices.createTransaction({
        prisma: req.prisma,
        data: {
          signature,
          invoice: inv,
          method,
          total,
          user,
          tagihan,
        },
      });

      res.status(200).json({ data: data.data, reference });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'error', error: error.message });
    }
  };

  getChannelPembayaran = async (req, res) => {
    try {
      const { tagihan } = req.body;

      const { allTagihan, totalTagihan, channelPembayaran } =
        await transactionServices.getChannelPembayaran({
          prisma: req.prisma,
          tagihan,
        });

      res.status(200).json({
        success: true,
        data: allTagihan,
        totalTagihan,
        channelPembayaran: channelPembayaran,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getDetailTransaksi = async (req, res) => {
    try {
      const { reference } = req.body;
      const data = await transactionServices.getDetailTransaction({
        reference,
      });

      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'error', error: error.message });
    }
  };
}

module.exports = { TransactionControllers };
