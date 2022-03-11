const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const errorFormatter = require('../utilities/validationErrorFormatter');
const Flash = require('../utilities/Flash');

// register get
const signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a new account',
        error: {},
        value: {},
        flashMessages: Flash.getMessage(req)
    })
}

// register post 
const signupPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    // validation error check
    const errors = validationResult(req).formatWith(errorFormatter);

    req.flash('fail', 'Please check your form!')
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Create a new account',
            error: errors.mapped(),
            value: {
                username,
                email,
                password,
            },
            flashMessages: Flash.getMessage(req)
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

        await user.save();

        req.flash('success', 'User saved successfully');
        res.redirect('/auth/login');
    } catch (error) {
        next(error);
    }

}


// login get 
const loginGetController = (req, res, next) => {
    // console.log(req.session.isLoggedIn, req.session.user);
    res.render('pages/auth/login', {
        title: 'Sign In',
        error: {},
        flashMessages: Flash.getMessage(req)
    })
}


// login post
const loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please check your form!')
        return res.render('pages/auth/login', {
            title: 'Sign In',
            error: errors.mapped(),
            flashMessages: Flash.getMessage(req)
        })
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('fail', 'Provide valid credentials');
            return res.render('pages/auth/login', {
                title: 'Sign In',
                error: {},
                flashMessages: Flash.getMessage(req)
            })
        } else {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                req.flash('fail', 'Provide valid credentials');
                return res.render('pages/auth/login', {
                    title: 'Sign In',
                    error: {},
                    flashMessages: Flash.getMessage(req)
                })
            } else {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.save(err => {
                    if (err) {
                        return next(err);
                    }
                    req.flash('success', 'Successfully logged in!');
                    res.redirect('/dashboard');
                });
            }
        }
    } catch (error) {
        next(error);
    }
}


// log out
const logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next(err);
        }
        // req.flash('success', 'Successfully logout!');
        res.redirect('/auth/login');

    });
}

// change pass get controller 
const changePasswordGetController = (req, res, next) => {
    res.render('pages/auth/changePassword', {
        title: 'Change Password',
        flashMessages: Flash.getMessage(req)
    })
}

// change pass post controller
const changePasswordPostController = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        req.flash('fail', 'Password does not match');
        res.redirect('/auth/change-password');
    }
    
    try {
        let matchPass = await bcrypt.compare(oldPassword, req.user.password);

        if (!matchPass) {
            req.flash('fail', 'Invalid Password');
            res.redirect('/auth/change-password');
        }

        let hashedPass = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { password: hashedPass } }
        )
        req.flash('success', 'Password Updated Successfully.!');
        return res.redirect('/auth/change-password');
    } catch (error) {
        next(error);
    }

}


module.exports = {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController,
    changePasswordGetController,
    changePasswordPostController
}