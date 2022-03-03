const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfilePostController,
    editProfileGetController
} = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { profileValidator } = require('../validator/profileValidator');
const router = require('express').Router({ caseSensitive: true });

router.get('/', isAuthenticated, dashboardGetController);

router.get('/create-profile', isAuthenticated, createProfileGetController);
router.post('/create-profile', isAuthenticated, createProfilePostController);

router.get('/edit-profile', isAuthenticated, editProfileGetController);
router.post('/edit-profile', isAuthenticated, editProfilePostController);

module.exports = router;