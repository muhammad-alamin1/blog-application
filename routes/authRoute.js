const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController');
const router = require('express').Router();

router.get('/register', signupGetController);
router.post('/register', signupPostController);

router.get('/login', loginGetController);
router.post('/login', loginPostController);

router.get('/logout', logoutController);

module.exports = router;