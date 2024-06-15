const {
  ApplicationControllers,
  PerumahanControllers,
} = require("./controllers");

function apply(app) {
  const applicationControllers = new ApplicationControllers();
  const perumahanControllers = new PerumahanControllers();

  app.get("/", applicationControllers.handleGetRoot);

  app.get("/api/perumahan", perumahanControllers.handleListPerumahan);
  app.post("/api/perumahan", perumahanControllers.handleCreatePerumahan);

  return app;
}

module.exports = { apply };
