const RolesServices = require('../services/rolesServices');
const { ApplicationControllers } = require('./applicationControllers');

class RolesControllers extends ApplicationControllers {
  getRoles = async (req, res) => {
    try {
      const roles = await RolesServices.getRoles({ prisma: req.prisma });
      res.status(200).json({ success: true, data: roles });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan',
        errorCode: 'INTERNAL_SERVER_ERROR',
      });
    }
  };

  createRoles = async (req, res) => {
    try {
      const role = req.body.nama;
      const newRoles = await RolesServices.createRole({
        role,
        prisma: req.prisma,
      });
      res.status(200).json({ success: true, data: newRoles });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan',
        errorCode: 'INTERNAL_SERVER_ERROR',
      });
    }
  };
}

module.exports = { RolesControllers };
