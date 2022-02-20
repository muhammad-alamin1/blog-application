const { dashboardGetController } = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = require('express').Router({ caseSensitive: true });

router.get('/', isAuthenticated, dashboardGetController);

module.exports = router;