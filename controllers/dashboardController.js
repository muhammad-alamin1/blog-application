const Flash = require("../utilities/Flash");
const Profile = require('../models/Profile');

// get dashboard
const dashboardGetController = async(req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            return res.render('pages/dashboard/dashboard', {
                title: 'My Dashboard',
                flashMessages: Flash.getMessage(req)
            })
        } else {
            res.redirect('/dashboard/create-profile')
        }
    } catch (error) {
        next(error);
    }

}

// create profile get controller
const createProfileGetController = async(req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            return res.redirect('/dashboard/edit-profile');
        } else {
            res.render('pages/dashboard/create-profile', {
                title: 'Create Profile',
                flashMessages: Flash.getMessage(req)
            });
        }

    } catch (error) {
        next(error);
    }
}

// create profile post controller
const createProfilePostController = (req, res, next) => {

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