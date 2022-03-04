const Flash = require("../utilities/Flash");
const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utilities/validationErrorFormatter');

// get dashboard
const dashboardGetController = async(req, res, next) => {
    res.render('pages/dashboard/dashboard', {
            title: 'My Dashboard',
            flashMessages: Flash.getMessage(req),

        })
        // try {
        //     // const profile = await Profile.findOne({ user: req.user._id });
        //     // if (profile) {
        //     //     return res.render('pages/dashboard/dashboard', {
        //     //         title: 'My Dashboard',
        //     //         flashMessages: Flash.getMessage(req),

    //     //     })
    //     // } else {
    //     //     res.redirect('/dashboard/create-profile');
    //     // }
    // } catch (error) {
    //     next(error);
    // }

}

// create profile get controller
const createProfileGetController = async(req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            return res.redirect('/dashboard');
        } else {
            res.render('pages/dashboard/create-profile', {
                title: 'Create Profile',
                flashMessages: Flash.getMessage(req),
                error: {}
            });
        }

    } catch (error) {
        next(error);
    }
}

// create profile post controller
const createProfilePostController = async(req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        res.render('pages/dashboard/create-profile', {
            title: 'Create Profile',
            flashMessages: Flash.getMessage(req),
            error: errors.mapped()
        });
    }

    // website, facebook, twitter, github
    const { title, name, email, bio } = req.body;
    console.log(req.body);
    const posts = {};
    const bookmarks = {};

    try {
        const profile = new Profile({
            user: req.user._id,
            name,
            email,
            title,
            bio,
            // profilePics: req.user.profilePics,
            // links: {
            //     website: website || '',
            //     facebook: facebook || '',
            //     twitter: twitter || '',
            //     github: github || '',
            // },
            // posts: [],
            // bookmarks: []
        })

        const createdProfile = await profile.save();
        await User.findOne({ _id: req.user._id }, { $set: { profile: createdProfile._id } });

        req.flash('success', 'Profile created successfully');
        res.redirect('/dashboard');

    } catch (error) {
        next(error);
    }

    // res.render('pages/dashboard/create-profile', {
    //     title: 'Create Profile',
    //     flashMessages: Flash.getMessage(req),
    //     error: {}
    // });
}

// edit profile get controller 
const editProfileGetController = (req, res, next) => {

}

// edit profile post controller
const editProfilePostController = (req, res, next) => {

}

module.exports = {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
}