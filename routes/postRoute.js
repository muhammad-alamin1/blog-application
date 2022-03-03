const postRouter = require('express').Router({ caseSensitive: true });

const { createPostGetController, createPostPostController } = require('../controllers/postController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const createPostValidator = require('../validator/postValidator');
const upload = require('../middleware/uploadMiddleware');

postRouter.get('/create', isAuthenticated, createPostGetController);
postRouter.post('/create', isAuthenticated, upload.single('post-thumbnail'), createPostValidator, createPostPostController);

module.exports = postRouter;