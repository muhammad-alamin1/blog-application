const { body } = require('express-validator');
// const validator = require('validator');


// check url func
const urlValidator = value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Provide a valid url.!')
        }
    }
    return true;
}


const profileValidator = [
    body('title')
    .not().isEmpty().withMessage('Title is required.!')
    .trim()
    .isLength({ max: 100 }).withMessage(`Title cann't be more than 100 characters.!`),
    body('bio')
    .not().isEmpty().withMessage('Title is required.!')
    .trim()
    .isLength({ max: 500 }).withMessage(`Bio cann't be more than 500 characters.!`),
    // body('website')
    // .custom(urlValidator),
    // body('facebook')
    // .custom(urlValidator),
    // body('twitter')
    // .custom(urlValidator),
    // body('github')
    // .custom(urlValidator),
]


module.exports = {
    profileValidator
}