const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController');
const { registerValidator } = require('../validator/registerValidator');
const router = require('express').Router({ caseSensitive: true });

router.get('/register', signupGetController);
router.post('/register', registerValidator, signupPostController);

router.get('/login', loginGetController);
router.post('/login', loginPostController);

router.get('/logout', logoutController);

module.exports = router;