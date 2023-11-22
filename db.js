const mongoose= require ("mongoose");
const dotenv= require("dotenv");
dotenv.config()

const connetDb= async() => {
    try {
        await mongoose.connect(process.env.mongoDb_Url);
        console.log('connected to MongoDB');

    } catch (error) {
       console.log(error) ;
    }
}
module.exports = connetDb;