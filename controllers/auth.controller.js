const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const sendEmail = require("../utils/mailer");
require("dotenv").config();

// User Auth
exports.userSignup = async (req, res) => {
  try {
    const { fullName, password, email, phoneNumber } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(404)
        .json({ success: false, message: "Already have an account" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      password: hashedPassword,
      email,
      phoneNumber,
      role: "user",
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    await sendEmail(email, "userSignup", { fullName: user.fullName });
    return res
      .status(200)
      .json({ token, success: true, message: "Signup successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.userSignin = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Signin failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    await sendEmail(email, "userSignin", { fullName: user.fullName });
    return res
      .status(200)
      .json({ token, success: true, message: "Signin successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin Auth
exports.adminSignup = async (req, res) => {
  try {
    const { fullName, password, email, phoneNumber } = req.body;

    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      return res
        .status(404)
        .json({ success: false, message: "Already have an account" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      fullName,
      password: hashPassword,
      email,
      phoneNumber,
      role: "admin",
    });

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
    );
    await sendEmail(email, "adminSignup", { fullName: admin.fullName });
    return res
      .status(200)
      .json({ token, success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.adminSignin = async (req, res) => {
  try {
    const { password, email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Signin failed" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
    );
    await sendEmail(email, "adminSignin", { fullName: admin.fullName });
    return res
      .status(200)
      .json({ token, success: true, message: "Welcome Back" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
