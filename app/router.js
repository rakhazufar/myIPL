const {
  ApplicationControllers,
  PerumahanControllers,
  AdminControllers,
  ExcelControllers,
  ClusterControllers,
} = require("./controllers");
const { checkAccessToken: auth } = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

function apply(app) {
  const applicationControllers = new ApplicationControllers();
  const perumahanControllers = new PerumahanControllers();
  const adminControllers = new AdminControllers();
  const excelControllers = new ExcelControllers();
  const clusterControllers = new ClusterControllers();

  app.get("/", applicationControllers.handleGetRoot);

  //AUTH
  app.post("/api/login", adminControllers.handleLogin);
  app.post("/api/create", auth, adminControllers.handleCreateAdmin);

  //PERUMAHAN
  app.get("/api/perumahan", perumahanControllers.handleListPerumahan);
  app.post("/api/perumahan", auth, perumahanControllers.handleCreatePerumahan);

  //CLUSTER
  app.post("/api/cluster", auth, clusterControllers.create);

  //USERS
  app.post("/upload-users", upload.single("file"), excelControllers.handleFile);

  return app;
}

module.exports = { apply };
