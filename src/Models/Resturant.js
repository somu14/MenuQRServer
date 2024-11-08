const mongoose = require("mongoose");
const menuschema = new mongoose.Schema({
  resturntname: String,
  Email: String,
  menulist: [{ dishname: String, price: Number }],
  Comment: [{ name: String, comment: String }],
});
const resturant = mongoose.model("resturant", menuschema);

module.exports = resturant;
