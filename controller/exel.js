const Excel = require("exceljs");
const multer = require('multer');
exports.exportFileExel = (req, res, next) => {
  // Create a new workbook and worksheet
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  // Add some data to the worksheet
  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "City", key: "city" },
  ];
  worksheet.addRow({ name: "John", age: 30, city: "New York" });
  worksheet.addRow({ name: "Jane", age: 25, city: "Los Angeles" });

  // Set the response headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "my-file.xlsx"
  );

  // Write the workbook to the response
  workbook.xlsx.write(res).then(() => {
    res.end();
  });
};
exports.importFileExel = (req, res, next) => {
    // Load the workbook from the uploaded file
  const workbook = new Excel.Workbook();
  workbook.xlsx.readFile(req.file.path)
    .then(() => {
      // Get the first worksheet
      const worksheet = workbook.getWorksheet(1);

      // Convert the worksheet to a JSON object
      const data = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            rowData[worksheet.getRow(1).getCell(colNumber).value] = cell.value;
          });
          data.push(rowData);
        }
      });

      // Send the JSON data in the response
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error reading file');
    });
};
