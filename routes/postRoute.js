const postRouter = require('express').Router({ caseSensitive: true });

const {
    createPostGetController,
    createPostPostController,
    editPostGetController,
    editPostPostController,
    deletePost,
    seeGetAllPostsController
} = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const createPostValidator = require('../validator/postValidator');
const upload = require('../middleware/uploadMiddleware');

// post create route
postRouter.get('/create', isAuthenticated, createPostGetController);
postRouter.post(
    '/create',
    isAuthenticated,
    upload.single('post-thumbnail'),
    createPostValidator,
    createPostPostController
);

// post edit route
postRouter.get('/edit/:postId', isAuthenticated, editPostGetController);
postRouter.post(
    '/edit/:postId',
    isAuthenticated,
    upload.single('post-thumbnail'),
    createPostValidator,
    editPostPostController
);

// delete
postRouter.get('/delete/:postId', isAuthenticated, deletePost);
postRouter.get('/', isAuthenticated, seeGetAllPostsController);

module.exports = postRouter;