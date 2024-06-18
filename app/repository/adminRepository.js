const { prisma: prism } = require("../../db/prisma");
const { exclude } = require("../../libs/prisma");
const { hashPassword } = require("../../libs/bcrypt");
class AdminRepository {
  findbyName = async ({ prisma, email }) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      return admin;
    } catch (error) {
      console.error("Error finding admin:", error);
      throw error;
    }
  };

  findAdminWithoutPassword = async ({ email }) => {
    try {
      const admin = await prism.admin.findUnique({
        where: {
          email: email,
        },
      });

      const adminwithoutPassword = exclude(admin, ["password"]);
      return adminwithoutPassword;
    } catch (error) {
      console.error("Error finding admin:", error);
      throw error;
    }
  };

  //bikin create admin
  createAdmin = async (
    prisma,
    { nama, email, password, nomor_telepon, role_id }
  ) => {
    try {
      const hashedPassword = await hashPassword({ passwordString: password });
      const newAdmin = await prisma.admin.create({
        data: {
          nama,
          email,
          password: hashedPassword,
          nomor_telepon,
          role_id,
        },
      });

      return newAdmin;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database operation failed");
    }
  };
}

module.exports = new AdminRepository();
