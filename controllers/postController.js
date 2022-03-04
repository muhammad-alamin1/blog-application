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
        tags = tags.map(t => t.trim());
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

        req.flash('success', 'Post created successfully.!');
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

// edit post get controller
const editPostGetController = async(req, res, next) => {
    let postId = req.params.postId;

    let post = await Post.findOne({ author: req.user._id, _id: postId });

    try {
        if (!post) {
            let error = new Error('404 Not Found');
            error.status = 404;
            throw error;
        } else {
            res.render('pages/dashboard/post/edit-post', {
                title: 'edit post',
                error: {},
                flashMessages: Flash.getMessage(req),
                post,
            });
        }
    } catch (error) {
        next(error);
    }
}

// edit post post controller
const editPostPostController = async(req, res, next) => {
    let { title, body, tags } = req.body;
    let errors = validationResult(req).formatWith(errorFormatter);

    try {
        let post = await Post.findOne({ author: req.user._id, _id: req.params.postId });
        if (!post) {
            let error = new Error('404 Not Found');
            error.status = 404;
            throw error;
        }

        if (!errors.isEmpty()) {
            res.render('pages/dashboard/post/create-post', {
                title: 'Create New Post',
                error: errors.mapped(),
                flashMessages: Flash.getMessage(req),
                post
            })
        }

        if (tags) {
            tags = tags.split(',');
            tags = tags.map(t => t.trim());
        }

        let thumbnail = post.thumbnail;
        if (req.file) {
            thumbnail = req.file.filename;
        }

        await Post.findOneAndUpdate({ _id: post._id }, { $set: { title, body, tags, thumbnail } }, { new: true });

        req.flash('success', 'Post updated successfully.!');
        // res.redirect('/posts/edit/' + post._id);
        res.redirect('/posts');

    } catch (error) {
        next(error);
    }
}

// delete post
const deletePost = async(req, res, next) => {
    const { postId } = req.params;

    try {
        let post = await Post.findOne({ author: req.user._id, _id: postId });

        if (!post) {
            let error = new Error('404 Not Found');
            error.status = 404;
            throw error;
        } else {
            await Post.findOneAndDelete({ _id: postId });
            await Profile.findOneAndUpdate({ user: req.user._id }, { $pull: { 'posts': postId } });

            req.flash('success', 'Post delete successfully.!');
            res.redirect('/posts');
        }

    } catch (error) {
        next(error);
    }
}

// see get all posts 
const seeGetAllPostsController = async(req, res, next) => {
    try {
        let posts = await Post.find({ author: req.user._id });
        res.render('pages/dashboard/post/posts', {
            title: 'My Posts',
            posts,
            flashMessages: Flash.getMessage(req),
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPostGetController,
    createPostPostController,
    editPostGetController,
    editPostPostController,
    deletePost,
    seeGetAllPostsController
}