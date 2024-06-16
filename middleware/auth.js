const { decodeToken } = require("../libs/token");
const AdminRepository = require("../app/repository/adminRepository");

const checkAccessToken = async (req, res, next) => {
  const tokenBearer = req.headers.authorization;
  const token = tokenBearer?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }

  try {
    const decoded = decodeToken(token);
    req.body.admin = await AdminRepository.findAdminWithoutPassword({
      email: decoded.user.email,
    });
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  checkAccessToken,
};
