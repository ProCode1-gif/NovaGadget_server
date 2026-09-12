const User = require("../models/user.model");
const MyOrder = require("../models/myOrder.model");
const Product = require("../models/product.model");
const { broadcast } = require("../ws");
const Payment = require("../models/payment.model");

exports.placeOrder = async (req, res) => {
  try {
    const { products, paymentMethod, selectedAccountId } = req.body;

    const user = await User.findById();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let totalAmount = 0;

    for (const item of products) {
      totalAmount += item.price * item.quantity;
    }

    if (paymentMethod === 1) {
      if (user.balance < totalAmount) {
        return res.status(400).json({
          message: "Insufficient balance",
        });
      }

      user.balance -= totalAmount;

      await user.save();
    }

    else if (paymentMethod > 1) {
      if (!selectedAccountId) {
        return res.status(400).json({
          message: "Please select an account",
        });
      }

    }

    const order = await MyOrder.create({
      user: user._id,
      products: products._id,
      quantity,
      totalAmount,
      status,
    });

    const payment = await Payment.create({
      user: user._id,
      order: order._id,
      totalAmount,
      currency: "NGN",
      paymentMethod,
      status,
      transactionId: `TNXX${Math.floor(Math.random() * 1000000)}`
    });

    const notification = await Notification.create({
      recipient: products.adminId,
      type: "NEW_ORDER",
      message: `New order for ${products.name}`,
      order: order._id,
      payment: payment._id,
    });

    adminSocket.send(
      JSON.stringify({
        type: "NEW_ORDER",
        notification,
      }),
    );

    broadcast({ type: "NEW_ORDER", data: order });
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.myOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const product = await Product.find({ userId });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(201).json({ product, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.customerOrder = async (req, res) => {
  try {
    const orders = await MyOrder.find();

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found" });
    }
    return res.status(201).json({ orders, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.salesByCategory = async (req, res) => {
  try {
    const sales = await MyOrder.aggregate([
      { $unwind: "$products" },

      {
        $group: {
          _d: "$products.category",
          totalSales: {
            $num: {
              $multiply: ["$products.price", "$products.quantity"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json({ sales, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get sales" });
  }
};

exports.monthlySales = async (req, res) => {
  try {
    const monthlySales = await MyOrder.aggregate([
      { $unwind: "$produccts" },

      {
        $group: {
          _id: "$_id",
          month: { month: "$createAt" },
          year: { year: "$createAt" },
        },
        totalSales: {
          $num: {
            $multiply: ["$products.price", "$products.quantity"],
          },
        },
      },
      {
        $sort: {
          "_id year": 1,
          "_id month": 1,
        },
      },
    ]);

    res.status(200).json({ monthlySales, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to get monthly sales" });
  }
};
