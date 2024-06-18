const { ApplicationControllers } = require("./applicationControllers");
const ExcelService = require("../services/excelServices");

class ExcelControllers extends ApplicationControllers {
  handleFile = async (req, res) => {
    try {
      const upload = await ExcelService.upload({ req });
      res.status(201).send({ success: true, upload: upload });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, error: error.message });
    }
  };
}

module.exports = { ExcelControllers };
