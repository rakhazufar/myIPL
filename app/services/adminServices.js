const { verifyPassword } = require("../../libs/bcrypt");
const { createToken } = require("../../libs/token");
const AdminRepository = require("../repository/adminRepository");
class AdminService {
  login = async ({ prisma, reqBody }) => {
    const email = reqBody.email;
    const password = reqBody.password;
    const admin = await AdminRepository.findbyName({ prisma, email });

    if (!admin) {
      throw new Error("admin password or username not found");
    }

    const isPasswordCorrect = verifyPassword(password, admin.password);

    if (!isPasswordCorrect) {
      throw new Error("password incorrect");
    }

    const accessToken = createToken(admin);
    return accessToken;
  };

  createAdmin = async ({ prisma, reqBody, response }) => {
    const adminRole = reqBody.admin.role_id;
    console.log(reqBody);

    if (adminRole != 1) {
      throw new Error("Not Authorized");
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
