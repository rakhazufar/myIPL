const {
  ApplicationControllers,
  PerumahanControllers,
  AdminControllers,
  ExcelControllers,
  ClusterControllers,
  UserControllers,
  TagihanControllers,
  RolesControllers,
  TransactionControllers,
} = require('./controllers');
const { checkAccessToken: auth } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

function apply(app) {
  const applicationControllers = new ApplicationControllers();
  const perumahanControllers = new PerumahanControllers();
  const adminControllers = new AdminControllers();
  const excelControllers = new ExcelControllers();
  const clusterControllers = new ClusterControllers();
  const userControllers = new UserControllers();
  const tagihanControllers = new TagihanControllers();
  const rolesControllers = new RolesControllers();
  const transactionControllers = new TransactionControllers();

  app.get('/', applicationControllers.handleGetRoot);

  //AUTH
  app.post('/api/login', adminControllers.handleLogin);
  app.post('/api/create', auth, adminControllers.handleCreateAdmin);
  app.post('/token', adminControllers.handleRefreshToken);
  app.get('/api/whoiam', auth, adminControllers.handleWhoIAm);

  // Role
  app.get('/api/roles', auth, rolesControllers.getRoles);
  app.post('/api/roles', auth, rolesControllers.createRoles);

  //PERUMAHAN
  app.get('/api/perumahan', perumahanControllers.handleListPerumahan);
  app.post('/api/perumahan', auth, perumahanControllers.handleCreatePerumahan);

  //CLUSTER
  app.post('/api/cluster', auth, clusterControllers.create);
  app.get('/api/clusters', clusterControllers.get);

  //TAGIHAN
  app.post('/api/tagihan', auth, tagihanControllers.create);
  app.get('/api/tagihan', auth, tagihanControllers.get);
  app.get('/api/tagihan/user', tagihanControllers.getByNomorTlp);

  //TRANSAKSI
  app.post('/api/transaction', transactionControllers.create);
  app.post(
    '/api/transaction/channel-pembayaran',
    transactionControllers.getChannelPembayaran
  );
  app.post(
    '/api/transaction/detail',
    transactionControllers.getDetailTransaksi
  );

  //USERS
  app.post(
    '/upload-users',
    auth,
    upload.single('file'),
    excelControllers.handleFile
  );
  app.get('/api/users', auth, userControllers.get);

  return app;
}

module.exports = { apply };
