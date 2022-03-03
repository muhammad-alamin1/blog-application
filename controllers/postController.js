const readingTime = require('reading-time');
const { validationResult } = require('express-validator');

const Flash = require("../utilities/Flash");
const errorFormatter = require('../utilities/validationErrorFormatter');
const Post = require('../models/Post');
const Profile = require('../models/Profile');


const createPostGetController = (req, res, next) => {
    res.render('pages/dashboard/post/create-post', {
        title: 'Create New Post',
        error: {},
        flashMessages: Flash.getMessage(req),
        value: {}
    })
}

// create post post controller
const createPostPostController = async(req, res, next) => {
    let { title, body, tags } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        res.render('pages/dashboard/post/create-post', {
            title: 'Create New Post',
            error: errors.mapped(),
            flashMessages: Flash.getMessage(req),
            value: {
                title,
                body,
                tags
            }
        })
    }

    if (tags) {
        tags = tags.split(',');
    }

    let readTime = readingTime(body).text;

    let newPost = new Post({
        title,
        body,
        author: req.user._id,
        tags,
        thumbnail: '',
        readTime,
        likes: [],
        dislikes: [],
        comments: []
    });

    if (req.file) {
        newPost.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        let createdPost = await newPost.save();
        // await Profile.findByIdAndUpdate({ user: req.user._id }, { $push: { 'posts': createdPost._id } });

        req.flash('Success', 'Post created successfully.!');
        return res.redirect(`/posts/edit/${createdPost._id}`);
    } catch (error) {
        next(error);
    }

    // res.render('pages/dashboard/post/create-post', {
    //     title: 'Create New Post',
    //     error: {},
    //     flashMessages: Flash.getMessage(req),
    //     value: {}
    // })
}


module.exports = {
    createPostGetController,
    createPostPostController
}