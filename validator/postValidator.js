const { body } = require('express-validator');
const cheerio = require('cheerio');

const createPostValidator = [
    body('title')
    .not().isEmpty().withMessage('Title cannot be empty.!')
    .isLength({ max: 100 }).withMessage('Title cannot be greater than 100 characters.!')
    .trim(),
    body('tags')
    .not().isEmpty().withMessage('Tags cannot be empty.!'),
    body('body')
    .not().isEmpty().withMessage('Body cannot be empty.!')
    .custom(value => {
        let $ = cheerio.load(value);
        let text = $.text();

        if (text.length > 3000) {
            throw new Error('Body cannot be larger than 3000 characters.!')
        }
        return true;
    })
];


module.exports = createPostValidator;