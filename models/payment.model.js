const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    method: { type: mongoose.Schema.Types.ObjectId, ref: "Payment Method" },
    amount: { type: Number, require: true }, // Better: store only last 4 digits
    currency: { type: String, require: true },
    paymentStatus: { type: String, enum: ["Pending", "Successful  ", "Cancelled"], default: "Pending", },
    transactionId: { type: String, require: true },
    paidAt: { type: Date, default: Date.now, require: true },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
