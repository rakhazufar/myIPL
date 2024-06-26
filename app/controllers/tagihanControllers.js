const TagihanService = require('../services/tagihanServices');
const { ApplicationControllers } = require('./applicationControllers');

class TagihanControllers extends ApplicationControllers {
  create = async (req, res) => {
    try {
      const reqBody = req.body;
      const tagihan = await TagihanService.create({
        prisma: req.prisma,
        reqBody,
      });

      return res.status(200).json({ message: 'success', data: tagihan });
    } catch (error) {
      return res.status(500).json({ message: 'error', error });
    }
  };

  get = async (req, res) => {
    try {
      const tagihan = await TagihanService.getTagihan({ prisma: req.prisma });

      return res.status(200).json({ message: 'success', data: tagihan });
    } catch (error) {
      return res.status(500).json({ message: 'error', error });
    }
  };

  getByNomorTlp = async (req, res) => {
    try {
      const nomor_telepon = req.body.nomor_telepon;
      const tagihan = await TagihanService.getTagihanByNomorTlp({
        nomor_telepon,
        prisma: req.prisma,
      });

      return res.status(200).json({ success: true, data: tagihan });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}

module.exports = { TagihanControllers };
