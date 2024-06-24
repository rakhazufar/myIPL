class RolesRepository {
  get = async ({ prisma }) => {
    try {
      const roles = await prisma.role.findMany();
      return roles;
    } catch (error) {
      console.error('Error Get Roles:', error);
      throw new Error('Failed to Get Roles');
    }
  };

  create = async ({ role, prisma }) => {
    try {
      const newrole = await prisma.role.create({
        data: {
          nama: role,
        },
      });
      return newrole;
    } catch (error) {
      console.error('Error Create Role:', error);
      throw new Error('Failed to Create Role');
    }
  };
}

module.exports = new RolesRepository();
