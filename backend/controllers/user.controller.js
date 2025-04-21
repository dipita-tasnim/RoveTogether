const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

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
        res.status(201).json({ token, user });
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
        res.status(200).json({ token, user });
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
