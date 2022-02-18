const rootController = (req, res) => {
    res.json({
        success: true,
        message: 'Root routes are available.!'
    })
}

module.exports = {
    rootController
}