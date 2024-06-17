const { verifyPassword } = require("../../libs/bcrypt");
const { createToken } = require("../../libs/token");
const AdminRepository = require("../repository/adminRepository");
class AdminService {
  login = async ({ prisma, reqBody, response }) => {
    const email = reqBody.email;
    const password = reqBody.password;
    const admin = await AdminRepository.findbyName({ prisma, email });

    if (!admin) {
      return response
        .status(403)
        .json({ message: "admin password or username not found" });
    }

    const isPasswordCorrect = verifyPassword(password, admin.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({ message: "password incorrect" });
    }

    const accessToken = createToken(admin);
    return accessToken;
  };

  createAdmin = async ({ prisma, reqBody, response }) => {
    const adminRole = reqBody.admin.id_role;

    if (adminRole != 1) {
      throw new Error("Not Authorized");
    }

    const { nama, email, password, nomor_telepon, id_role } = reqBody;

    try {
      const newAdmin = await AdminRepository.createAdmin(prisma, {
        nama,
        email,
        password,
        nomor_telepon,
        id_role,
      });

      if (!newAdmin) {
        return response
          .status(409)
          .json({ message: "failed to create new admin" });
      }

      return newAdmin;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Service operation failed");
    }
  };
}

module.exports = new AdminService();
