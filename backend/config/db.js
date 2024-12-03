const mongoose = require("mongoose")

async function connectDB(){
    try{
        
        await mongoose.connect("mongodb+srv://PhanCongMinh:Congminh2002@cluster0.qlpzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connect to DB successfully");
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB