const explorerRouter = require('express').Router({ caseSensitive: true });

const { explorerGetController } = require('../controllers/explorerController');

explorerRouter.get('/', explorerGetController);


module.exports = explorerRouter;