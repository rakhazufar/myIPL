const UserService = require("../services/userServices");
const { ApplicationControllers } = require("./applicationControllers");

class UserControllers extends ApplicationControllers {
  get = async (req, res) => {
    try {
      const clusters = await UserService.get({ prisma: req.prisma });

      res.status(201).json({ success: true, data: clusters });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = { UserControllers };
