const { check, body, validationResult } = require('express-validator');
const User = require('../models/User');

const registerValidator = [
    body('username')
    .isLength({
        min: 2,
        max: 15
    }).withMessage(`Username must be between 2 to 15 character.!`)
    .custom(async username => {
        const user = await User.findOne({ username })
        if (user) {
            return Promise.reject(`Username already used.!`)
        }
    })
    .trim(),
    body('email')
    .isEmail().withMessage('Please enter a valid email.!')
    .custom(async email => {
        const user = await User.findOne({ email })
        if (user) {
            return Promise.reject('E-mail already used.!')
        }
    })
    .normalizeEmail(),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.!'),
    body('confirmPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.!')
    .custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.password) {
            return Promise.reject('Password confirmation does not match password')
        }
        return true;
    })
]


module.exports = {
    registerValidator
}