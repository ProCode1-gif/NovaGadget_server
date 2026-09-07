const PaymentMethod = require("../models/paymentMethod.model");
const Payment = require("../models/payment.model");
const bcrypt = require("bcrypt");
const { broadcast } = require("../ws");

exports.addPaymentMethod = async (req, res) => {
  try {
    const {
      type,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      bankName,
      accountNumber,
      cvv,
    } = req.body;

    const paymentMethod = await PaymentMethod.create({
      user: req.userId,
      type,
      cardHolderName,
      cardNumber: await bcrypt.hash(cardNumber, 10),
      expiryMonth,
      expiryYear,
      bankName,
      accountNumber: await bcrypt.hash(accountNumber, 10),
      cvv: await bcrypt.hash(cvv, 10),
    });

    broadcast({ type: "New Payment Method", data: paymentMethod });
    return res.status(200).json({ paymentMethod, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addPayment = async (req, res) => {
  try {
    const { order, method, amount, currency, paymentStatus, paidAt } = req.body;

    const payment = await Payment.create({
      user: req.userId,
      order,
      method,
      amount,
      currency,
      paymentStatus,
      transactionId,
      paidAt,
    });

    broadcast({ type: "New Payment", data: payment });
    return res.status(200).json({ payment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;

    const payment = await PaymentMethod.find({ userId });
    if (!payment) {
      return res
        .status(400)
        .json({ success: false, message: "No address yet" });
    }

    return res.status(201).json({ payment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const payment = await Payment.find({ userId });
    if (!payment) {
      return res
        .status(400)
        .json({ success: false, message: "No address yet" });
    }

    return res.status(201).json({ payment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      type,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      bankName,
      accountNumber,
      cvv,
    } = req.body;

    const payment = await PaymentMethod.findOne({ userId });
    if (!payment) {
      return res
        .status(400)
        .json({ success: false, message: "No address yet" });
    }

    const update = {
      type,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      bankName,
      accountNumber,
      cvv,
    };
    const updatePayment = await PaymentMethod.findOneAndUpdate({ update });
    return res.status(201).json({ updatePayment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllPaymentMetod = async (req, res) => {
  try {
    const payment = await PaymentMethod.find();
    if (!payment) {
      return res
        .status(400)
        .json({ success: false, message: "No address yet" });
    }

    return res.status(201).json({ payment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllPayment = async (req, res) => {
  try {
    const payment = await Payment.find();
    if (!payment) {
      return res
        .status(400)
        .json({ success: false, message: "No address yet" });
    }

    return res.status(201).json({ payment, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
