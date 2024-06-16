const { ApplicationControllers } = require("./applicationControllers");
const ExcelJS = require("exceljs");
const multer = require("multer");

class ExcelControllers extends ApplicationControllers {
  handleFile = async (req, res) => {
    try {
      const filePath = req.file.path;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);
      const users = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const [id, name, address, phoneNumber] = row.values.slice(1);
          users.push({
            nama: name,
            alamat: address,
            nomor_telepon: phoneNumber,
          });
        }
      });

      console.log({ users });

      //   // Insert users into the database
      //   for (const user of users) {
      //     await prisma.user.create({
      //       data: user,
      //     });
      //   }

      //   res.status(200).send("File uploaded and data inserted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing the file");
    }
  };
}

module.exports = { ExcelControllers };
