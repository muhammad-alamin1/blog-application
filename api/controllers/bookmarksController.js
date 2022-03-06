const Profile = require("../../models/Profile")

const bookmarksController = async(req, res, next) => {
    const { postId } = req.params;
    let bookmarks = null;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    // user _id
    let userId = req.user._id;

    try {
        let profile = await Profile.findOne({ user: userId });
        if (profile.bookmarks.includes(postId)) {
            await Profile.findOneAndUpdate({ user: userId }, { $pull: { 'bookmarks': postId } });

            bookmarks = false;
        } else {
            await Profile.findOneAndUpdate({ user: userId }, { $push: { 'bookmarks': postId } });

            bookmarks = true;
        }

        res.status(200).json({
            bookmarks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }
}


module.exports = {
    bookmarksController
}