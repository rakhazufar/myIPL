const TagihanService = require("../services/tagihanServices");
const { ApplicationControllers } = require("./applicationControllers");

class TagihanControllers extends ApplicationControllers {
  create = async (req, res) => {
    try {
      const reqBody = req.body;
      const tagihan = await TagihanService.create({
        prisma: req.prisma,
        reqBody,
      });

      return res.status(200).json({ message: "success", data: tagihan });
    } catch (error) {
      return res.status(500).json({ message: "error", error });
    }
  };

  get = async (req, res) => {
    try {
      const tagihan = await TagihanService.getTagihan({ prisma: req.prisma });

      return res.status(200).json({ message: "success", data: tagihan });
    } catch (error) {
      return res.status(500).json({ message: "error", error });
    }
  };
}

module.exports = { TagihanControllers };
