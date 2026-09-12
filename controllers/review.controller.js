const Review = require('../models/review.model')
const { broadcast } = require('../ws')

exports.addRevieew = async (req, res) => {
  try {
    const { rating, comment } = req.body
  
    const review = await Review.create({
      user: req.user._id,
      product: req.product._id,
      rating,
      comment
    })
  
    broadcast({ type: 'New_Review', data: review })
    return res.status(200).json({ review, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getReview = async (req, res) => {
  try {
    const userId = req.user._id

    const review = await Review.find({userId})
    if (!review) {
      return res.status(400).json({ success: false, message: 'No address yet' })
    }

    return res.status(201).json({review, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getAllReview = async (req, res) => {
  try {
    const review = await Review.find()
    if (!review) {
      return res.status(400).json({ success: false, message: 'No address yet' })
    }

    return res.status(201).json({review, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}