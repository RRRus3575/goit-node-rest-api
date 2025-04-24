// emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};
