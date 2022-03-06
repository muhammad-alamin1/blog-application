const Post = require("../../models/Post");

// post Likes
const postLikesController = async(req, res, next) => {
    const { postId } = req.params;
    let liked = null;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    const userId = req.user._id;

    try {
        let post = Post.findById(postId);
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'dislikes': userId } });
        }

        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'likes': userId } });
            liked = false;
        } else {
            await Post.findOneAndUpdate({ _id: postId }, { $push: { 'likes': userId } });
            liked = true;
        }

        let updatedPost = await Post.findById(postId);
        res.status(200).json({
            liked,
            totalLikes: updatedPost.likes.length,
            totalDislikes: updatedPost.dislikes.length
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }
}

// dislikes post controller
const dislikePostController = async(req, res, next) => {
    const { postId } = req.params;
    let disliked = null;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    const userId = req.user._id;

    try {
        let post = Post.findById(postId);
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'likes': userId } });
        }

        if (post.dislikes.includes(userId)) {
            await Post.findByIdAndUpdate({ _id: postId }, { $pull: { 'dislikes': userId } });
            disliked = false;
        } else {
            await Post.findOneAndUpdate({ _id: postId }, { $push: { 'dislikes': userId } });
            disliked = true;
        }

        let updatedPost = await Post.findById(postId);
        res.status(200).json({
            disliked,
            totalLikes: updatedPost.likes.length,
            totalDislikes: updatedPost.dislikes.length
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }
}


module.exports = {
    postLikesController,
    dislikePostController
};