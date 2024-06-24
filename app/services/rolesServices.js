const RolesRepository = require('../repository/rolesRepository');

class RolesService {
  async getRoles({ prisma }) {
    try {
      const roles = await RolesRepository.get({ prisma });
      return roles;
    } catch (error) {
      console.error('Error retrieving roles list in service:', error);
      throw new Error('Service failed to retrieve roles list');
    }
  }

  async createRole({ role, prisma }) {
    try {
      const roles = await RolesRepository.create({ role, prisma });
      return roles;
    } catch (error) {
      console.error('Error create roles list in service:', error);
      throw new Error('Service failed to create role');
    }
  }
}

module.exports = new RolesService();
