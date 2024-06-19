const adminServices = require('../services/adminServices');
const AdminService = require('../services/adminServices');
const { ApplicationControllers } = require('./applicationControllers');

class AdminControllers extends ApplicationControllers {
  handleLogin = async (req, res) => {
    try {
      const reqBody = req.body;
      const { accessToken, refreshToken } = await AdminService.login({
        prisma: req.prisma,
        reqBody,
      });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        .cookie('accessToken', accessToken, { httpOnly: true, secure: true })
        .json({ message: true });
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
      console.error('Controller error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  handleRefreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan',
        errorCode: 'TOKEN_NOT_FOUND',
      });
    }

    try {
      const newAccessToken = adminServices.refreshToken({ refreshToken });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(201).json({ success: true, message: 'Token refreshed' });
    } catch (error) {
      if (error.message === 'TOKEN_EXPIRED') {
        return res.status(401).json({
          success: false,
          message: 'Token kedaluwarsa',
          errorCode: 'TOKEN_EXPIRED',
        });
      } else if (error.message === 'INVALID_TOKEN') {
        return res.status(403).json({
          success: false,
          message: 'Token tidak valid',
          errorCode: 'INVALID_TOKEN',
        });
      } else {
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan',
          errorCode: 'INTERNAL_SERVER_ERROR',
        });
      }
    }
  };
}

module.exports = { AdminControllers };
