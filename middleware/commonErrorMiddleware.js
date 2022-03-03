const pageNotFoundError = (req, res, next) => {
    const error = new Error(`404 page not found.!`);
    error.status = 404;
    next(error);
}

const commonErrorHandler = (err, req, res, next) => {
    console.log(err);
    if (err.status === 404) {
        return res.render('pages/error/404', {
            flashMessages: {}
        })
    }
    res.render('pages/error/500', {
        flashMessages: {}
    })
}

module.exports = {
    pageNotFoundError,
    commonErrorHandler,
}