const Flash = require("../utilities/Flash");
const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utilities/validationErrorFormatter');
const Comment = require("../models/Comment");

// get dashboard
const dashboardGetController = async (req, res, next) => {
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
const createProfileGetController = async (req, res, next) => {
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
const createProfilePostController = async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        res.render('pages/dashboard/create-profile', {
            title: 'Create Profile',
            flashMessages: Flash.getMessage(req),
            error: errors.mapped()
        });
    }

    const { title, name, email, bio, website, facebook, twitter, github } = req.body;
    // console.log(req.body);

    try {
        const profile = new Profile({
            user: req.user._id,
            name,
            email,
            title,
            bio,
            profilePics: req.file.filename || '',
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || '',
            },
            posts: [],
            bookmarks: []
        })

        const createdProfile = await profile.save();
        await User.findOneAndUpdate({ _id: req.user._id }, { $set: { profile: createdProfile._id, profilePics: createdProfile.profilePics } });

        req.flash('success', 'Profile created successfully');
        res.redirect('/dashboard');

    } catch (error) {
        next(error);
    }
}

// edit profile get controller 
const editProfileGetController = (req, res, next) => {

}

// edit profile post controller
const editProfilePostController = (req, res, next) => {

}

// bookmarks get controller
const bookmarksGetController = async (req, res, next) => {
    try {
        let profile = Profile.findOne({ user: req.user._id })
            .populate({
                path: 'bookmarks',
                model: 'Post',
                select: 'title, thumbnail'
            })
        res.json(profile)
        res.render('pages/dashboard/bookmarks', {
            title: 'My Bookmarks',
            flashMessages: Flash.getMessage(req),
            posts: profile.bookmarks
        });
    } catch (error) {
        next(error);
    }
}

// comment get controller
const commentGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id });
        let comments = await Comment.find({ post: { $in: profile.post } })
            .populate({
                path: 'post',
                select: 'title'
            })
            .populate({
                path: 'user',
                select: 'username profilePics'
            })
            .populate({
                path: 'replies',
                select: 'username profilePics'
            })

        res.render('pages/dashboard/comments', {
            title: 'Comments',
            flashMessages: Flash.getMessage(req),
            comments
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController,
    bookmarksGetController,
    commentGetController
}