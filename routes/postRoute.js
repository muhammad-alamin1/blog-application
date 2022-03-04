const postRouter = require('express').Router({ caseSensitive: true });

const { createPostGetController, createPostPostController, editPostGetController, editPostPostController } = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const createPostValidator = require('../validator/postValidator');
const upload = require('../middleware/uploadMiddleware');

postRouter.get('/create', isAuthenticated, createPostGetController);
postRouter.post('/create', isAuthenticated, upload.single('post-thumbnail'), createPostValidator, createPostPostController);
postRouter.get('/edit/:postId', isAuthenticated, editPostGetController);
postRouter.post('/edit/:postId', isAuthenticated, upload.single('post-thumbnail'), createPostValidator, editPostPostController);

module.exports = postRouter;