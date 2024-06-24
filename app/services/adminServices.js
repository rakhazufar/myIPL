const { verifyPassword } = require('../../libs/bcrypt');
const { createAccessToken, createRefreshToken } = require('../../libs/token');
const AdminRepository = require('../repository/adminRepository');
const { decodeRefreshToken } = require('../../libs/token');
const adminRepository = require('../repository/adminRepository');
class AdminService {
  login = async ({ prisma, reqBody }) => {
    const email = reqBody.email;
    const password = reqBody.password;
    const admin = await AdminRepository.findbyName({ prisma, email });

    if (!admin) {
      throw new Error('admin password or username not found');
    }

    const isPasswordCorrect = verifyPassword(password, admin.password);

    if (!isPasswordCorrect) {
      throw new Error('password incorrect');
    }

    const accessToken = createAccessToken(admin);
    const refreshToken = createRefreshToken(admin);

    return { accessToken, refreshToken };
  };

  createAdmin = async ({ prisma, reqBody }) => {
    const adminRole = reqBody.admin.role_id;
    console.log(reqBody);

    if (adminRole != 1) {
      throw new Error('Not Authorized');
    }

    const { nama, email, password, nomor_telepon, role_id } = reqBody;

    try {
      const newAdmin = await AdminRepository.createAdmin(prisma, {
        nama,
        email,
        password,
        nomor_telepon,
        role_id,
      });

      if (!newAdmin) {
        throw new Error('Failed to create new admin');
      }

      return newAdmin;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Service operation failed');
    }
  };

  refreshToken = ({ refreshToken }) => {
    try {
      const decodedToken = decodeRefreshToken({ token: refreshToken });
      const newAccessToken = createAccessToken(decodedToken.data);
      return newAccessToken;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('TOKEN_EXPIRED');
      } else {
        throw new Error('TOKEN_INVALID');
      }
    }
  };
}

module.exports = new AdminService();
