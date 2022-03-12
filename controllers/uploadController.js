const User = require('../models/User');
const Profile = require('../models/Profile');

const uploadProfilePic = async (req, res, next) => {
    console.log('file', req.file)
    if (req.file) {
        try {
            const profile = await Profile.findOne({ user: req.user._id });
            const profilePics = `/uploads/${req.file.filename}`;
            if (profile) {
                await Profile.findOneAndUpdate({ user: req.user._id }, { $set: { profilePics } });
            }

            await User.findOneAndUpdate({ _id: req.user._id }, { $set: { profilePics } });
            res.status(200).json({ profilePics });

        } catch (error) {
            res.status(500).json({
                profilePics: req.user.profilePics
            })
        }
    } else {
        res.status(500).json({
            profilePics: req.user.profilePics
        })
    }
}

// post image upload controller
const postImageUploadController = (req, res, next) => {
    console.log('file', req.files)
    if (req.file) {
        return res.status(200).json({
            location: `/uploads/${req.file.filename}`
        })
    }

    return res.status(500).json({
        message: `Internal server side error.!`
    })
}

module.exports = {
    uploadProfilePic,
    postImageUploadController
}