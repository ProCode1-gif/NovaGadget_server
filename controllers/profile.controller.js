const User = require("../models/user.model");
const Admin = require("../models/admin.model");

exports.userProfile = async (req, res) => {
  try {
    const userId = req.user._id.param

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, messaage: 'User not found' })
    }

    return res.status(201).json({ user, success: true });
  } catch (error) {
    return res.status(500).json({ messaage: error.messaage });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user._id.param
  const { fullName, password, email, phoneNumber } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, messaage: 'User not found' })
    }

    const update = { fullName, password, email, phoneNumber }

    const updateUser = await User.findOneAndUpdate({ update })
    return res.status(201).json({ updateUser, success: true });
  } catch (error) {
    return res.status(500).json({ messaage: error.messaage });
  }
};

exports.customers = async (req, res) => {
  try {
    const customers = await User.find();
    if (!customers) {
      return res.status(404).json({ success: false, message: 'No customer' });
    }

    return res.status(200).json({ customers, success: true });
  } catch (error) {
    return res.status(500).json({ success: false,  message: error.messaage });
  }
};

exports.adminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id.param;
    
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      res.status(404).json({ success: false, messaage: 'Admin not found' });
    }

    return res.status(200).json({ admin, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.messaage });
  }
};

exports.admins = async (req, res) => {
  try {
    const admin = await Admin.find();
    if (!admin) {
      res.status(404).json({ success: false, messaage: error.messaage })
    }

    return res.status(200).json({ admin, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.messaage });
  }
};
