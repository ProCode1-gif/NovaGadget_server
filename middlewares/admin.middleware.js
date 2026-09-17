const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(405).json({ message: "Admin only"})
  }
  next()
}

module.exports = admin;
