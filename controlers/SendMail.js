const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendMail(toEmail,subject,content){
  console.log("email");
    const mailOption= {
        from:"divyaraj.fsd@gmail.com",
        to : toEmail,
        subject:subject,
        html: content
    };
    transporter.sendMail(mailOption,(error,info) =>{
        if(error){
          console.log("error occured",error);
        }
        else
        {
            console.log("Email from :",info.response)
        }
    });
}
module.exports  =  {sendMail};