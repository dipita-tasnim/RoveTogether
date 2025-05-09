const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and well-formed
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    // Safely extract token from header
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }
    const isBlacklisted = await userModel.findOne({ token: token });
    
    if (isBlacklisted) {
        return res.status(401). json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Logged out" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ message: "Unauthorized access" });
    }
};
