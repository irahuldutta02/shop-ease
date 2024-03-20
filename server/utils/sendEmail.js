import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USERNAME,
} from "../config/server.config.js";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Rahul Dutta <dev.rahul.dutta.02@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
