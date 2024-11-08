const express = require("express");
const bodyparser=require("body-parser");
const connectdb=require("./src/Models/db");
const cors=require("cors");
require('dotenv').config();



const app = express();
app.use(cors());
app.use(bodyparser.json()); // Parses incoming JSON requests
app.use(bodyparser.urlencoded({ extended: true })); // Parses URL-encoded data
connectdb();

app.use("/signup",require("./src/Routes/Signup"));
app.use("/login",require("./src/Routes/Login"));
app.use("/home",require("./src/Routes/Home"));
app.listen(4000, () => {
  console.log("server is running");
});
