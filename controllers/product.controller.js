const Product = require("../models/product.model");
const { broadcast } = require("../ws");

exports.addProducts = async (req, res) => {
  try {
    const { brand, name, description, features, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file.path;

    const product = await new Product.create({
      adminId: req.admin._Id,
      imageUrl,
      brand,
      name,
      description,
      price,
      features: features.split(",").map((feature) => {
        const [key, value] = feature.split(":");
        return { key: key.trim(), value: value.trim() };
      }),
    });

    broadcast({ type: "PRODUCT_ADDED", data: product });
    return res
      .status(201)
      .json({ product, success: true, message: "Product added" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAdminProducts = async (req, res) => {
  try {
    const adminId = req.admin._id
    const products = await Product.find({ adminId });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { search } = req.query;

    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


