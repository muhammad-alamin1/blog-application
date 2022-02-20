// get dashboard
const dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {
        title: 'My Dashboard'
    })
}

module.exports = {
    dashboardGetController,
}