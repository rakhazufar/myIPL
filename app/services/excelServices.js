const ExcelJS = require('exceljs');
const ExcelRepository = require('../repository/excelRepository');
const fs = require('fs');

class ExcelService {
  async upload({ req }) {
    try {
      if (!req.file) {
        throw new Error('Failed to upload file');
      }
      const filePath = req.file.path;
      const cluster = req.body.cluster;
      if (!cluster) {
        throw new Error('Please input the cluster');
      }
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);
      const users = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const [nama, address, phoneNumber, email] = row.values.slice(1);
          if (!nama || !address || !phoneNumber || !email) {
            throw new Error('Data dalam file tidak lengkap');
          }
          users.push({
            cluster_id: parseInt(cluster),
            nama: nama,
            alamat: address,
            nomor_telepon: phoneNumber,
            email: email.result,
          });
        }
      });

      const result = await ExcelRepository.uploadExcel({
        prisma: req.prisma,
        users,
      });

      return result;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error(error.message);
    } finally {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error saat menghapus file:', err);
          }
          console.log('File berhasil dihapus');
        });
      }
    }
  }
}

module.exports = new ExcelService();
