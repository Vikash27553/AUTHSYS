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
     const verificationLink = `http://localhost:8080/api/verify?token=${token}`;
     const htmlToSend = template({verificationLink, name: email, appName: "Authsystem"});  
    if (!token) {
        throw new Error('No token provided');
    }

 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 465,
    // secure: false, // true for 465, false for other ports
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});
 


const info = {
    from: process.env.MAIL_USER,
    to:email,
    subject: "Verify your email",
    text: "Hello, please verify your email",
    html:htmlToSend,
}

    transporter.sendMail(info, (err, res)=> {

        if(err){
            console.log("Error occurred", err);
        }
        console.log("Email sent successfully", res);

 })
}
