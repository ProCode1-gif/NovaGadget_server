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
      ref: "MyOrder",
      required: true
    },
    totalAmount: { type: Number, require: true }, 
    currency: { type: String, require: true, default: "NGN" },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod" },
    status: { type: String, enum: ["Pending", "Paid", "Cancelled"], default: "Pending", },
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
