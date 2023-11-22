const { sign } = require('jsonwebtoken');
const User= require ('../models/User');
const bcrypt = require("bcrypt");
var jwt = require ("jsonwebtoken");
const dotenv = require("dotenv"); 

dotenv.config();

async function checkUser(email){
    try {
        
        const user= await User.findOne({email: email});
        console.log(user);
        if(user)
        { 
            return true;
        }
        return false;
    }  catch (e) 
    {
        console.log("error in user", e)
        return "server Busy"
    }
}

async function AuthenticateUser(email,password){
    try {

        const userCheck= await User.findOne({email: email});
        const validPassword = await bcrypt.compare(password,userCheck.password);
        if(validPassword){
            const token= jwt.sign({email},process.env.login_token)
            const response = {
                id : userCheck._id,
                name: userCheck.name,
                email : userCheck.email,
                token : token,
                status: true
            }
    
    await User.findOneAndUpdate({email: userCheck.email},{$set:{token:token}},{new:true})
    return response;
 }
     return " Invalid Username or password"   
    } catch (error) {
        console.log(error);
        return " server busy"
        
    }
}


module.exports= {checkUser, AuthenticateUser}