const UserRepository = require("../repository/userRepository");

class UserService {
  async get({ prisma }) {
    try {
      const clusters = await UserRepository.get({ prisma });
      return clusters;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Service operation failed");
    }
  }
}

module.exports = new UserService();
