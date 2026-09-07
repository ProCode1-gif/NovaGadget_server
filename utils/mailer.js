const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const sendEmail = async (to, temmplate, userData) => {
  try {
    const templatePath = path.join(__dirname, `../views/${temmplate}.ejs`)
    const html = await ejs.renderFile(templatePath, userData)
  
    const mailOptions = {
      from: `NovaGadget ${process.env.MAIL_USER}`,
      to,
      subject: 'NovaGadget Notification',
      html
    }
  
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw(error);
  }
}

module.exports = sendEmail
