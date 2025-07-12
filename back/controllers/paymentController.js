const razorpay = require("../utils/razorpay");

const createOrder = async (req, res) => {
  const { planId } = req.body;
  const plan = await HealthPlan.findById(planId);
  if (!plan) return res.status(404).json({ msg: "Plan not found" });

  const options = {
    amount: plan.price * 100, // in paise
    currency: "INR",
    receipt: `plan_rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order, plan });
  } catch (error) {
    res.status(500).json({ msg: "Razorpay error", error });
  }
};

const verifyAndComplete = async (req, res) => {
  const { planId, paymentId } = req.body;
  const userId = req.user._id;

  const plan = await HealthPlan.findById(planId);
  if (!plan) return res.status(404).json({ msg: "Plan not found" });

  const userPlan = new UserPlan({
    userId,
    planId,
    pricePaid: plan.price,
    paymentMethod: "razorpay",
    razorpayPaymentId: paymentId,
  });
  await userPlan.save();

  const txn = new Transaction({
    userId,
    type: "debit",
    amount: plan.price,
    method: "razorpay",
    reference: userPlan._id,
    description: `Razorpay: ${paymentId}`,
  });
  await txn.save();

  res.json({ success: true });
};

module.exports = { createOrder, verifyAndComplete };
