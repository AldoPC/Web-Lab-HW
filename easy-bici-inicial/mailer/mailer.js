const nodemailer = require("nodemailer");

const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "liam.bednar26@ethereal.email",
    pass: "sErXsZ9NaNXS8eXFY3",
  },
};

module.exports = nodemailer.createTransport(mailConfig);
