const router = require('express').Router({ caseSensitive: true });
const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController, changePasswordGetController, changePasswordPostController } = require('../controllers/authController');
const { isUnAuthenticated, isAuthenticated } = require('../middleware/authMiddleware');
const { loginValidator } = require('../validator/loginValidator');
const { registerValidator } = require('../validator/registerValidator');


router.get('/change-password', isAuthenticated, changePasswordGetController);
router.post('/change-password', isAuthenticated, changePasswordPostController);

router.get('/register', isUnAuthenticated, signupGetController);
router.post('/register', isUnAuthenticated, registerValidator, signupPostController);

router.get('/login', isUnAuthenticated, loginGetController);
router.post('/login', isUnAuthenticated, loginValidator, loginPostController);

router.get('/logout', logoutController);


module.exports = router;