const { rootController } = require('../controllers/rootController');

const router = require('express').Router({ caseSensitive: true });

router.get('/', rootController);

module.exports = router;