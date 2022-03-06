const apiRouter = require('express').Router({ caseSensitive: true });

const { isAuthenticated } = require('../../middleware/authMiddleware');
const { commentPostController, replyComment } = require('../controllers/commentsController');
const { postLikesController, dislikePostController } = require('../controllers/likeDislikeController');


// comments
apiRouter.post('/comments/:postId', isAuthenticated, commentPostController);

// replies
apiRouter.post('/comments/replies/:commentId', isAuthenticated, replyComment);

// likes 
apiRouter.get('/likes/:postId', isAuthenticated, postLikesController);
apiRouter.get('/dislikes/:postId', isAuthenticated, dislikePostController);


module.exports = apiRouter;