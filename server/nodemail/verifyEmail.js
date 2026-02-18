import nodemailer from 'nodemailer';
 import dotenv from 'dotenv';
 import  fs from 'fs';
 import path from 'path';  
//  import  url from 'url';
//  import jwt from 'jsonwebtoken';
    import  handlerbars from "handlebars";
    import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
 
 
 dotenv.config();
 
 

 export const verifyEmail = async (token,email) => {

     const  emailTemplateSource = fs.readFileSync(path.join(__dirname, '../emailTemplate/verify-email.hbs'), 'utf8');
     const template = handlerbars.compile(emailTemplateSource);
     const verificationLink = `${process.env.FRONTEND_URL || process.env.LOCAL_FRONTEND_URL}/api/verify?token=${token}`;
     const htmlToSend = template({verificationLink, name: email, appName: "Authsystem"});  
    if (!token) {
        throw new Error('No token provided');
    }
try {
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    logger: true, // Enable logging for debugging
    debug: true,  // Show detailed debug output
     // true for 465, false for other ports
      // true for 465, false for other ports
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
          connectionTimeout: 50000,
          greetingTimeout: 20000,   // Wait for the server to say hello
          socketTimeout: 20000,     // Wait for data to move // 10 seconds
});
 



  const info = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify your email for Authsystem",
    text: "Hello, please verify your email",
    html: htmlToSend,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(info, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log("Email sent successfully", info.messageId);
        resolve(info);
      }
    });
  });
} catch (error) {
  console.error("Error sending verification email:", error);
  throw error; // Re-raise the error so the caller knows it failed
}
 


}
