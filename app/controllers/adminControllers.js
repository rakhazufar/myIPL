const AdminService = require("../services/adminServices");
const { ApplicationControllers } = require("./applicationControllers");

class AdminControllers extends ApplicationControllers {
  handleLogin = async (req, res) => {
    try {
      const reqBody = req.body;
      const accessToken = await AdminService.login({
        prisma: req.prisma,
        reqBody,
      });

      return res
        .status(200)
        .json({ message: "success", accessToken: accessToken });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  handleCreateAdmin = async (req, res) => {
    try {
      const reqBody = req.body;
      const newAdmin = await AdminService.createAdmin({
        prisma: req.prisma,
        reqBody,
        response: res,
      });

      res.status(200).json({ success: true, data: newAdmin });
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}

module.exports = { AdminControllers };
