const User = require("../models/User");
const Flash = require("../utilities/Flash");

const authorProfileGetController = async (req, res, next) => {
    const { userId } = req.params;

    try {
        let author = await User.findById(userId)
            .populate({
                path: 'profile',
                populate: {
                    path: 'posts'
                }
            })

        res.render('pages/explorer/author', {
            title: author.username,
            flashMessages: Flash.getMessage(req),
            author
        });
    } catch (error) {
        next(error);
    }
}


module.exports = authorProfileGetController;