var express = require("express");
const connetDb = require('./db.js');
const cors = require("cors");
var signinRouter= require("./routes/Signin.js")
var loginRouter= require("./routes/Login.js")


var app = express();
const port = 4000;
connetDb();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/", (req,res) => {
    res.send("hiii");s
});
//sing router
app.use('/signin',signinRouter);
app.use('/login',loginRouter)

app.listen(port , () =>{
    console.log(`server is running on ${port}`);
});