const express = require("express");
const { AuthenticateUser } = require("../controlers/Login");
const router = express.Router();




router.post("/",async (req,res) =>{
    try {
        const {email,password} = await req.body
        var loginCrediential= await AuthenticateUser(email,password);
        console.log(loginCrediential);
        if(loginCrediential === "Invalid username or Password"){
        res.status(200).send("Invalid username or Password")
        }else if(loginCrediential=== "Server busy"){
            res.status(200).send("Server busy")
        }else {
            res.status(200).json({token:loginCrediential.token})
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("server busy")
        
    }
})

module.exports = router