const Address = require('../models/address.model')
const { broadcast } = require('../ws')

exports.addAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, country, state, city, street, postalCode, landmark, addressType } = req.body
  
    const address = await Address.create({
      user: req.userId,
      fullName,
      phoneNumber,
      country,
      state,
      city,
      street,
      postalCode,
      landmark,
      addressType
    })
  
    broadcast({ type: 'New Address', data: address })
    return res.status(200).json({ success: true, address })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getAddress = async (req, res) => {
  try {
    const userId = req.user.id

    const address = await Address.find({userId})
    if (!address) {
      return res.status(400).json({ success: false, message: 'No address yet' })
    }

    return res.status(201).json({ address, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id
    const {phoneNumber, country, state, city, street, postalCode, landmark, addressType} = req.body

    const address = await Address.find({userId})
    if (!address) {
      return res.status(400).json({ success: false, message: 'No address yet' })
    }

    const update =  {phoneNumber, country, state, city, street, postalCode, landmark, addressType}
    const addressUpdate = await Address.findOneAndUpdate({ update })
    return res.status(201).json({ addressUpdate, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getAllAddress = async (req, res) => {
  try {
    const address = await Address.find()
    if (!address) {
      return res.status(400).json({ success: false, message: 'No address yet' })
    }

    return res.status(201).json({ address, success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}