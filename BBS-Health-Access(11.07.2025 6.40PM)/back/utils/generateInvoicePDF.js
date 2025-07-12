const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoicePDF = async ({ user, invoiceData, type }) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const filename = `Invoice-${type}-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, `../invoices/${filename}`);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Header
  doc.fontSize(20).text("BBSCART Health Access Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice Type: ${type}`);
  doc.text(`User: ${user.name} (${user.email})`);
  doc.text(`Date: ${new Date().toLocaleString()}`);
  doc.moveDown();

  // Invoice Details Table
  doc.fontSize(14).text("Transaction Summary", { underline: true });
  doc.moveDown();

  invoiceData.forEach((item) => {
    doc.fontSize(12).text(`${item.label}: ${item.value}`);
  });

  doc.end();

  return filename;
};

module.exports = generateInvoicePDF;
