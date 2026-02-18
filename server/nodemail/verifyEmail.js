import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';  
import handlebars from "handlebars"; // Fixed spelling from 'handlerbars'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const verifyEmail = async (token, email) => {
    // Check token early
    if (!token) {
        throw new Error('No token provided');
    }

    // Move file reading inside try/catch for safety
    try {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../emailTemplate/verify-email.hbs'), 'utf8');
        const template = handlebars.compile(emailTemplateSource);
        const verificationLink = `${process.env.LOCAL_FRONTEND_URL}/verify?token=${token}`;
        const htmlToSend = template({ verificationLink, name: email.split('@')[0], email, appName: "Authsystem" });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use true for port 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
            // Increased timeouts for Render stability
             connectionTimeout: 10000, // 10 seconds      
        });

        const info = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify your email for Authsystem",
            text: `Hello, please verify your email: ${verificationLink}`,
            html: htmlToSend,
        };

        // Nodemailer supports promises, no need for manual 'new Promise' wrapper
        const result = await transporter.sendMail(info);
        console.log("Email sent successfully", result.messageId);
        return result;

    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error; 
    }
};



