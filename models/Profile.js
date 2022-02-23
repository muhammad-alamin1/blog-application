const { Schema, model } = require('mongoose');
// const User = require('./User');
// const Post = require('./Post');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
        maxLength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: ' Post'
    }]

}, { timestamps: true });

const Profile = model('Profile', profileSchema);

module.exports = Profile;