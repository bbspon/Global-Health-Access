const PlanPayment = require("../models/PlanPayment");
const Wallet = require("../models/Wallet");

exports.initiatePayment = async (req, res) => {
  const { planId, amount, method, partialPayment } = req.body;

  const payment = new PlanPayment({
    userId: req.user._id,
    planId,
    totalAmount: amount,
    amountPaid: partialPayment ? amount * 0.4 : amount,
    paymentMethod: method,
    partialPayment,
  });

  await payment.save();
  res.json({ success: true, payment });
};

exports.payWithWallet = async (req, res) => {
  const { paymentId } = req.body;
  const payment = await PlanPayment.findById(paymentId);

  const wallet = await Wallet.findOne({ userId: req.user._id });

  if (wallet.balance < payment.amountPaid) {
    return res.status(400).json({ error: "Insufficient wallet balance" });
  }

  wallet.balance -= payment.amountPaid;
  await wallet.save();

  payment.status = "paid";
  await payment.save();

  res.json({ message: "Payment successful", payment });
};
