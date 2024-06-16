const {
  ApplicationControllers,
  PerumahanControllers,
  AdminControllers,
  ExcelControllers,
} = require("./controllers");
const { checkAccessToken: auth } = require("../middleware/auth");
const upload = multer({ dest: "uploads/" });

function apply(app) {
  const applicationControllers = new ApplicationControllers();
  const perumahanControllers = new PerumahanControllers();
  const adminControllers = new AdminControllers();
  const excelControllers = new ExcelControllers();

  app.get("/", applicationControllers.handleGetRoot);

  //AUTH
  app.post("/api/login", adminControllers.handleLogin);
  app.post("/api/create", auth, adminControllers.handleCreateAdmin);

  //PERUMAHAN
  app.get("/api/perumahan", perumahanControllers.handleListPerumahan);
  app.post("/api/perumahan", auth, perumahanControllers.handleCreatePerumahan);

  //USERS
  app.post("/upload-users", upload.single("file"), excelControllers.handleFile);

  return app;
}

module.exports = { apply };
