const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

// comment
const commentPostController = async(req, res, next) => {
    const { postId } = req.params;
    const { body } = req.body;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let newComment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try {
        let result = await newComment.save();
        await Post.findByIdAndUpdate({ _id: postId }, { $push: { 'comments': result._id } });

        let commentJSON = await Comment.findById(result._id).populate({
            path: 'user',
            select: 'profilePics username'
        });

        return res.status(200).json(commentJSON);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }

}

// comment replies
const replyComment = async(req, res, next) => {
    const { commentId } = req.params;
    const { body } = req.body;

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let reply = {
        body,
        user: req.user._id,
    };

    try {
        await Comment.findByIdAndUpdate({ _id: commentId }, { $push: { 'replies': reply } }, );

        res.status(201).json({
            ...reply,
            profilePics: req.user.profilePics
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'There was an server side error.!'
        })
    }
}


module.exports = {
    commentPostController,
    replyComment
}