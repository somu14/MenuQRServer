const express = require("express");
const router = express.Router();
const Restaurant = require("../Models/Resturant");
const verifyToken = require("../Middleware/auth");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurantData = await Restaurant.findOne({ _id: id });
    if (!restaurantData) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json({
      menulistdata: restaurantData.menulist,
      restaurantname: restaurantData.resturntname,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Restaurant.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json({ commentdata: data.Comment, restaurantname: data.resturntname });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body;
    if (!name || !comment) {
      return res.status(400).json({ message: "Name and comment are required" });
    }
    const data = await Restaurant.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    data.Comment.push({ name, comment });
    await data.save();
    return res.status(200).json({ message: "Comment Sent" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const response = await Restaurant.findOne({ Email: user });
    if (!response) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json({ restaurantid: response._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { dishname, price } = req.body;
    const user = req.user;
    const restaurantData = await Restaurant.findOne({ Email: user });
    if (!restaurantData) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurantData.menulist.push({ dishname, price });
    await restaurantData.save();
    res.status(200).json({ message: "Dish added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:idval", verifyToken, async (req, res) => {
  try {
    const { idval } = req.params;
    const user = req.user;
    const restaurantData = await Restaurant.findOneAndUpdate(
      { Email: user },
      { $pull: { menulist: { _id: idval } } },
      { new: true }
    );
    if (!restaurantData) {
      return res.status(404).json({ message: "Restaurant or item not found" });
    }
    res.status(200).json({ message: "Item deleted", menulist: restaurantData.menulist });
  } catch (err) {
    console.error("Error deleting item:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
