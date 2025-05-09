const Ride = require('../models/rideModel'); // assuming the ride model is in this location
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
const mongoose = require('mongoose');


// Registration
module.exports.registerUser = async (req, res, next) => {
    try {
        console.log("Received registration data:", req.body);  // Debug incoming data

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstname, lastname, email, password } = req.body;

        // Hash password
        const hashedPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Create token
        const token = user.generateAuthToken();

        // Return token + user
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname, // or extract firstname: user.fullname.firstname if you want directly
            }
        });

    } catch (err) {
        console.error("Error in registration:", err);

        // Handle duplicate email
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};

// Login
module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname, // or extract firstname: user.fullname.firstname if you want directly
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Login failed" });
    }
};

// Logout
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (token) {
            await blackListTokenModel.create({ token });
        }
        return res.status(200).json({ message: "Logged out" });
    } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Logout failed" });
    }
};

// Profile
module.exports.getUserProfile = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json(user);
};

//all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

// user.controller.js

// Fetch user by ID (for profile viewing)
module.exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;  // Get the user ID from the URL parameter
  
      // Check if the user ID is valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      // Find the user by ID, excluding the password field for security
      const user = await userModel.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);  // Return the user data
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      res.status(500).json({ message: "Server error, please try again later." });
    }
  };
  

//Delete users [with all his rides also]

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    // ALSO delete all rides created by this user
    await Ride.deleteMany({ user_id: id });

    res.status(200).json({ message: "User and their rides deleted successfully" });
};
