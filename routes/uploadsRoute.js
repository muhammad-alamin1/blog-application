const { uploadProfilePic, postImageUploadController } = require('../controllers/uploadController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = require('express').Router({ caseSensitive: true });

// profile pic upload post route
router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePic);
router.post('/postimage', isAuthenticated, upload.single('post-image'), postImageUploadController);


module.exports = router;