const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["Card", "Bank Transaction", "PayPal"],
      required: true,
    },

    cardHolderName: String,

    cardNumber: String,
    expiryMonth: String,
    expiryYear: String,

    bankName: String,
    accountNumber: String,
    cvv: String,

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);
