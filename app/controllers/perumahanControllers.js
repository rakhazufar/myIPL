const PerumahanService = require("../services/perumahanServices");

class PerumahanControllers {
  handleListPerumahan = async (req, res) => {
    try {
      const listPerumahan = await PerumahanService.getList(req.prisma);
      res.status(200).json({ success: true, data: listPerumahan });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  handleCreatePerumahan = async (req, res) => {
    try {
      const reqBody = req.body;
      const perumahan = await PerumahanService.create(req.prisma, reqBody);
      res.status(201).json({ success: true, data: perumahan });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = { PerumahanControllers };
