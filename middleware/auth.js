const { decodeToken } = require('../libs/token');
const AdminRepository = require('../app/repository/adminRepository');

const checkAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'Token tidak ditemukan',
        errorCode: 'TOKEN_NOT_FOUND',
      });
  }

  try {
    const decoded = decodeToken(accessToken);
    req.body.admin = await AdminRepository.findAdminWithoutPassword({
      email: decoded.data.email,
    });

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token kedaluwarsa',
        errorCode: 'TOKEN_EXPIRED',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid',
        errorCode: 'INVALID_TOKEN',
      });
    }
  }
};

module.exports = {
  checkAccessToken,
};
