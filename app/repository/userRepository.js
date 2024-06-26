class UserRepository {
  get = async ({ prisma }) => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Error Get Users:', error);
      throw new Error('Failed to Get users');
    }
  };

  getByID = async ({ prisma, id }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      console.error('Error Get User:', error);
      throw new Error('Failed to Get user');
    }
  };

  getByNomorTelepon = async ({ prisma, nomor_telepon }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          nomor_telepon,
        },
      });

      return user;
    } catch (error) {
      console.error('Error Get User:', error);
      throw new Error('Failed to Get user');
    }
  };
}

module.exports = new UserRepository();
