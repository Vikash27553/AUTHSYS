// import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();



const resend = new Resend(process.env.RESEND_API_KEY);

export const sendotpmail = async (email, otp) => {
 await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: [email],
  subject: 'Password Reset OTP',
  html: `<p>Your OTP for password reset is: <b>${otp}</b><br/>It is valid for 10 minutes.</p>`,
});
};
