function apply(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
}

module.exports = { apply };
