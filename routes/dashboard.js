const router = require('express').Router({ caseSensitive: true });
const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfilePostController,
    editProfileGetController,
    bookmarksGetController,
    commentGetController
} = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { profileValidator } = require('../validator/profileValidator');
const upload = require('../middleware/uploadMiddleware');


router.get('/', isAuthenticated, dashboardGetController);

router.get('/create-profile', isAuthenticated, createProfileGetController);
router.post('/create-profile', isAuthenticated, upload.single('profilePics'), createProfilePostController);

router.get('/edit-profile', isAuthenticated, editProfileGetController);
router.post('/edit-profile', isAuthenticated, editProfilePostController);

router.get('/bookmarks', isAuthenticated, bookmarksGetController);
router.get('/comments', isAuthenticated, commentGetController);

module.exports = router;