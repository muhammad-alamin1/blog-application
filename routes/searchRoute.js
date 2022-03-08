const searchRouter = require('express').Router({ caseSensitive: true});

const { searchResultGetController } = require('../controllers/searchController');


searchRouter.get('/', searchResultGetController);


module.exports = searchRouter;