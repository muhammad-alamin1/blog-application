const moment = require('moment');
const Post = require("../models/Post");
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
    let { order, filterObj } = filterObject(filter.toLowerCase());

    try {
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt');

        res.render('pages/explorer/explorer', {
            title: 'All posts',
            filter,
            flashMessages: Flash.getMessage(req),
            posts
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports = {
    explorerGetController
}