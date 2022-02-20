const { check, body } = require('express-validator');

const loginValidator = [
    body('email')
    .not()
    .isEmpty().withMessage(`E-mail con't be empty.!`),
    body('password')
    .not()
    .isEmpty().withMessage(`Password can not be empty.!`)
]

module.exports = {
    loginValidator
};