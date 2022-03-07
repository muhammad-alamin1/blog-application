const explorerRouter = require('express').Router({ caseSensitive: true });

const { explorerGetController, singlePageController } = require('../controllers/explorerController');

explorerRouter.get('/', explorerGetController);
explorerRouter.get('/:postId', singlePageController);


module.exports = explorerRouter;