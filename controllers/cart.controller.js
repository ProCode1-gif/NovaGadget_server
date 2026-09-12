const MyCart = require("../models/cart.model");
const Product = require('../models/product.model')
const { broadcast } = require("../ws")

exports.addToCart = async (req, res) => {
  try {
    const { quantity } = req.body
  
    const productId = product._id

    const product = await Product.findById(productId)
  
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product already in cart' })
    }
    const cart = await MyCart.create({
      user: req.user._id,
      productIds: [productId],
      quantity,
      totalPrice: product.price * quantity
    })
    
    broadcast({ type: CART_ADDED, data: cart })
    return res.status(201).json({ cart, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
};

exports.myCart = async (req, res) => {
  try {
    const userId = req.user._id
    
    const product = await Product.find({userId})

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not in cart' })
    }
    return res.status(201).json({ product, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
};
