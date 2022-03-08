const Post = require("../models/Post");
const Flash = require("../utilities/Flash");

const searchResultGetController = async(req, res, next) => {
    let term = req.query.term;
    let currPage = parseInt(req.query.page) || 1;
    let itemPerPage = 5;

    try {
        let posts = await Post.find(
            { $text: { $search: term }}
        ).skip((itemPerPage * currPage )- itemPerPage).limit(itemPerPage);

        let totalPost = await Post.countDocuments({$text: { $search: term }})

        let totalPage = totalPost / itemPerPage;

        res.render('pages/explorer/search', {
            title: `Result for ${term}`,
            flashMessages: Flash.getMessage(req),
            searchTerm: term,
            itemPerPage,
            currPage,
            totalPage,
            posts
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    searchResultGetController
}