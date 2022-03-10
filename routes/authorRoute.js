const authorRouter = require('express').Router({ caseSensitive: true });
const authorProfileGetController = require('../controllers/authorController');


authorRouter.get('/:userId', authorProfileGetController);


module.exports = authorRouter;