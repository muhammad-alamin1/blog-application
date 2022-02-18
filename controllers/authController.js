const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const errorFormatter = require('../utilities/validationErrorFormatter');

// register get
const signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a new account',
        error: {},
        value: {}
    })
}

// register post 
const signupPostController = async(req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    // validation error check
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Create a new account',
            error: errors.mapped(),
            value: {
                username,
                email,
                password,
            }
        })
    }

    try {
        // hashing password then save to db 
        let hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashPassword,
        })

        let createdUser = await user.save()
            // console.log('user created success', createdUser); // TODO remove

        res.render('pages/auth/signup', {
            title: 'Create a new account'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }

}


// login get 
const loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {
        title: 'Sign In'
    })
}


// login post
const loginPostController = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: `Invalid Credential.!`
            })
        } else {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return res.json({
                    success: false,
                    message: `Invalid Credential.!`
                })
            } else {
                console.log(`Successfully login`, user);
                // rerender
                res.render('pages/auth/login', {
                    title: 'Sign In'
                })
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// log out
const logoutController = (req, res, next) => {

}


module.exports = {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
}