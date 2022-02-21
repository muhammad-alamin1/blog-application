const User = require('../models/User');

// bind user
const bindUserWithRequest = () => {
    return async(req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next();
        }

        try {
            const user = await User.findById(req.session.user._id);
            req.user = user;

            next();
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

// auth guard; authenticate user access this route 
const isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    next();
}

// authenticate user don't see sign up & sign in implementation
const isUnAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/dashboard');
    }
    next();
}

module.exports = {
    bindUserWithRequest,
    isAuthenticated,
    isUnAuthenticated
}