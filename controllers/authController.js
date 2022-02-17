const User = require('../models/User');

// register get
const signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a new account'
    })
}

// register post 
const signupPostController = async(req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    const user = new User({
        username,
        email,
        password,
    })

    try {
        let createdUser = await user.save()
        console.log('user created success', createdUser);

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

}


// login post
const loginPostController = (req, res, next) => {

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