const mongoose = require("mongoose");

const myOrderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productIds: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        totalAmount: { type: Number, default: 1 },
        status: {
          type: String,
          enum: ["Pending", "Delivered", "Cancelled"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("MyOrder", myOrderSchema);
