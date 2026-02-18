import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendotpmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,           // Use port 587 for TLS
    secure: false,       // false for TLS, true for port 465
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is: <b>${otp}</b><br/>It is valid for 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};
