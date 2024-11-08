const mongoose = require("mongoose");
require("dotenv").config();
const dbpassword=process.env.DB_PASSWORD;
const connectdb=()=>{
  mongoose
  .connect(
    "mongodb+srv://somu111725:"+dbpassword+"@menuqr.s5jki.mongodb.net/?retryWrites=true&w=majority&appName=MenuQR"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
}
  module.exports=connectdb;
