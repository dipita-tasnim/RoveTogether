const userModel = require("../models/user.model");
const userService = require('../services/user.sevice');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


//registration controller
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: erros.array()});
    }
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password); //  This will work



    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });
    
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}

//login controller
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  
    }
    const { email, password } = req.body;
    //checking user exist or not
    const user = await userModel.findOne({ email }).select('+password');
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });    
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
}

//profile controller
module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json(req.user);
}
//logout controller
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split('')[1];
    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
}



