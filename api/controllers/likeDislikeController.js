const Post = require("../../models/Post");

// post Likes
const postLikesController = async(req, res, next) => {
    const { postId } = req.params;
    const userId = req.user.id;
    let liked = null;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    try {
        let post = Post.findById(postId);
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'dislikes': userId } });
        }

        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'likes': userId } });
        } else {
            await Post.findOneAndUpdate({ _id: postId }, { $push: { 'likes': userId } });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }
}

// dislikes post controller
const dislikePostController = async(req, res, next) => {

}


module.exports = {
    postLikesController,
    dislikePostController
};