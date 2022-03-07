const moment = require('moment');
const Post = require("../models/Post");
const Profile = require('../models/Profile');
const Flash = require("../utilities/Flash");

const getDate = (days) => {
    let date = moment().subtract(days, 'days');
    return date.toDate();
}

const filterObject = (filter) => {
    let filterObj = {};
    let order = 1;

    switch (filter) {
        case 'week':
            {
                filterObj = {
                    createdAt: {
                        $gt: getDate(7)
                    }
                };
                order = -1;
                break;
            };
        case 'month':
            {
                filterObj = {
                    createdAt: {
                        $gt: getDate(30)
                    }
                };
                order = -1;
                break;
            };
        case 'all':
            {
                order = -1;
                break;
            };
    }

    return {
        filterObj,
        order
    }
}

// explorer get
const explorerGetController = async(req, res, next) => {
    let filter = req.query.filter || 'latest';
    let currPage = parseInt(req.query.page) || 1;
    const itemPerPage = 1;
    let { order, filterObj } = filterObject(filter.toLowerCase());

    try {
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currPage) - itemPerPage)
            .limit(itemPerPage);

        let totalPost = await Post.countDocuments();
        let totalPages = totalPost / itemPerPage;

        let bookmarks = [];
        if (req.user) {
            let profile = await Profile.findOne({ userId: req.user._id });
            if (profile) {
                bookmarks = profile.bookmarks;
            }
        }

        res.render('pages/explorer/explorer', {
            title: 'All posts',
            filter,
            flashMessages: Flash.getMessage(req),
            posts,
            totalPages,
            currPage,
            itemPerPage,
            bookmarks
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// single page controller 
const singlePageController = async(req, res, next) => {
    let { postId } = req.params;

    try {
        let post = await Post.findById(postId)
            .populate('author', 'username profilePics')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePics'
                },

            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies user',
                    select: 'username profilePics'
                }
            })

        if (!post) {
            let error = new Error('404 page not found');
            error.status = 404;
            throw error
        }

        let bookmarks = [];
        if (req.user) {
            let profile = await Profile.findOne({ userId: req.user._id });
            if (profile) {
                bookmarks = profile.bookmarks;
            }
        }

        res.render('pages/explorer/singlePage', {
            title: post.title,
            flashMessages: Flash.getMessage(req),
            post,
            bookmarks
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    explorerGetController,
    singlePageController
}