const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    body: {
        type: String,
        required: true,
        maxLength: 3000,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true })

// search 
postSchema.index({
    title: 'text',
    body: 'text',
    tags: 'text'
}, {
    weight: {
        title: 5,
        tags: 5,
        body: 2
    }
})

const Post = model('Post', postSchema);


module.exports = Post;