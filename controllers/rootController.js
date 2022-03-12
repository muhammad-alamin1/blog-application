const rootController = (req, res) => {
    res.render('partials/navigation', {
        title: 'Root - Blog Application'
    })
}

module.exports = {
    rootController
}