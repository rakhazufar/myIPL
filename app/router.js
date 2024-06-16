const {
  ApplicationControllers,
  PerumahanControllers,
  AdminControllers,
} = require("./controllers");
const { checkAccessToken: auth } = require("../middleware/auth");

function apply(app) {
  const applicationControllers = new ApplicationControllers();
  const perumahanControllers = new PerumahanControllers();
  const adminControllers = new AdminControllers();

  app.get("/", applicationControllers.handleGetRoot);

  //AUTH
  app.post("/api/login", adminControllers.handleLogin);
  app.post("/api/create", auth, adminControllers.handleCreateAdmin);

  //PERUMAHAN
  app.get("/api/perumahan", perumahanControllers.handleListPerumahan);
  app.post("/api/perumahan", auth, perumahanControllers.handleCreatePerumahan);

  return app;
}

module.exports = { apply };
