const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController');
const { isUnAuthenticated } = require('../middleware/authMiddleware');
const { loginValidator } = require('../validator/loginValidator');
const { registerValidator } = require('../validator/registerValidator');
const router = require('express').Router({ caseSensitive: true });

router.get('/register', isUnAuthenticated, signupGetController);
router.post('/register', isUnAuthenticated, registerValidator, signupPostController);

router.get('/login', isUnAuthenticated, loginGetController);
router.post('/login', isUnAuthenticated, loginValidator, loginPostController);

router.get('/logout', logoutController);

module.exports = router;