const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


//register routes model 
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 character'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character'),   
],
    userController.registerUser
)

//login routes model

router.post(
    '/login',
    [ 
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password invalid')
    ],
    userController.loginUser
);

//profile routes model
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
//logout
router.get('/logout', authMiddleware.authUser, userController.logoutUser);


module.exports = router;
