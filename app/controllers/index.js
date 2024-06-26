const { ApplicationControllers } = require('./applicationControllers');
const { PerumahanControllers } = require('./perumahanControllers');
const { AdminControllers } = require('./adminControllers');
const { ExcelControllers } = require('./excelControllers');
const { ClusterControllers } = require('./clusterControllers');
const { UserControllers } = require('./userControllers');
const { TagihanControllers } = require('./tagihanControllers');
const { RolesControllers } = require('./rolesControllers');
const { TransactionControllers } = require('./transactionControllers');

module.exports = {
  ApplicationControllers,
  PerumahanControllers,
  AdminControllers,
  ExcelControllers,
  ClusterControllers,
  UserControllers,
  TagihanControllers,
  RolesControllers,
  TransactionControllers,
};
