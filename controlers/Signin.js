const User= require("../models/User");
const {sendMail} = require("./SendMail");
const bcrypt = require("bcrypt");
const mongoose= require ("mongoose");
const dotenv = require("dotenv"); 
const verifyUser = require("../models/VerifyUser");
var jwt = require ("jsonwebtoken");
dotenv.config();

async function InsertVerifyUser(name,email,password){
    try {
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt)
       const token = generateToken(email);
       const newUser = new verifyUser({
        name: name,
        email: email,
        password : hashedPassword,
        token: token
       })
       const activationLink = `http://localhost:4000/signin/${token}`;
       const content=`<h4>hi welcome to the app</h4>
       <h5>thank you for signin</h5><p> click on the below Link</p>
       <a href="${activationLink}"> Click here</a>
       <p>Regards th Team</p>`;
       
       await newUser.save();
       sendMail(email,"verifyUser",content)

    } catch (e) {
        console.log(e)
    }
}function generateToken(email){
    const token= jwt.sign(email,process.env.singnup_screct_token);
    return token
}

async function InsertSignupUser(token){
    try {
        const userVerify = await verifyUser.findOne({token:token})
    if(userVerify){
        const newUser = new User ({
            name: userVerify.name,
            email: userVerify.email,
            password: userVerify.password,
            forgetPassword:{}
        })
        await newUser.save();
        await userVerify.deleteOne({token:token});
        const content =`<h4>hi welcome to the app</h4>
        <h5> you are successfully register</h5>
        <p>Regards th Team</p>`;
        sendMail(newUser.email,"register success",content)
    }
    return `<h4>Register Succes</h4>
    <h5> Welcome .....</h5>
    <p>Regards th Team</p>`;

    } catch (e) {
        console.log(e)
        return `<html><body>
        <h4>Register Failed</h4>
        <h5> UnExpected error ....</h5>
        <p>Regards th Team</p>
        </body> </html>`;
        
    }
}

module.exports = { InsertVerifyUser,InsertSignupUser};
