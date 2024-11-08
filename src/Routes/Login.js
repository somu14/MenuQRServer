const express = require("express");
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
    const { Email, Password } = req.body;

    // Basic validation
    if (!Email || !Password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ Email: Email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the password with the stored hash
        const isPasswordValid =  bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.Email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "10d" } // Token expiration
        );

        // Login successful, return the token
        res.status(200).json({ message: "Login successful!",token: token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
