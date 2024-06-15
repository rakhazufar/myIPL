class ApplicationControllers {
  constructor(ApplicationControllers) {
    this.ApplicationControllers = ApplicationControllers;
  }

  handleGetRoot = (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "Secondhand API is up and running!",
    });
  };
}

module.exports = { ApplicationControllers };
