const express = require ("express");
const { checkUser } = require("../controlers/Login");
const { InsertVerifyUser, InsertSignupUser } = require("../controlers/Signin");
var router = express.Router();


router.get("/:token",async (req,res)=>{
    try {
        const response = await InsertSignupUser(req.params.token)
        res.status(200).send(response)
    } catch (e) {
        console.log(e)
        res.status(500).send(
            `<html><body>
        <h4>Register Failed</h4>
        <h5> UnExpected error ....</h5>
        <p>Regards th Team</p>
        </body> </html>`
        )
    }


})

    router.post("/verify",async (req,res)=>{
    try {
        const {name , email, password}= await req.body;
        console.log(name,email,password) ;
        const registerCredential=await checkUser(email)
        if(registerCredential === false){
            await InsertVerifyUser(name,email,password)
            res.status(200).send(true)
        }else if(registerCredential === true){
            res.status(200).send(false)
        }else if(registerCredential=== "server Busy"){
            res.status(500).send("server busy")
        }
    } catch (error) {
        
    }
} )
module.exports=router;