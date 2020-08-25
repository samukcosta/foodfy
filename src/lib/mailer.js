const dotenv = require('dotenv/config')
const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: process.env.E_HOST,
    port: process.env.E_PORT,
    auth: {
      user: process.env.E_USER,
      pass: process.env.E_PASS
    }
  });