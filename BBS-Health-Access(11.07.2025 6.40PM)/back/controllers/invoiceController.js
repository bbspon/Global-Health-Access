const PDFDocument = require("pdfkit");
const moment = require("moment");
const UserPlan = require("../models/UserPlan");
const User = require("../models/User");
const HealthPlan = require("../models/HealthPlan");

const generateInvoice = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user._id;

    const userPlan = await UserPlan.findOne({ _id: planId, userId }).populate(
      "planId"
    );
    const user = await User.findById(userId);

    if (!userPlan || !user) return res.status(404).send("Not found");

    const doc = new PDFDocument();
    let filename = `Invoice_${userPlan._id}.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/pdf");

    doc.fontSize(20).text("BBSCART Health Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Invoice ID: ${userPlan._id}`);
    doc.text(`Date: ${moment(userPlan.createdAt).format("DD MMM YYYY")}`);
    doc.text(`Customer: ${user.name} (${user.email})`);
    doc.moveDown();

    doc.text(`Plan: ${userPlan.planId.title}`);
    doc.text(`Amount Paid: ₹${userPlan.pricePaid}`);
    doc.text(`Payment Mode: ${userPlan.paymentMethod}`);
    doc.text(`Transaction ID: ${userPlan.razorpayPaymentId || "N/A"}`);

    doc.end();
    doc.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating invoice");
  }
};

module.exports = { generateInvoice };
