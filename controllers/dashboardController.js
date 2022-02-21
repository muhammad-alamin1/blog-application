const Flash = require("../utilities/Flash")

// get dashboard
const dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {
        title: 'My Dashboard',
        flashMessages: Flash.getMessage(req)
    })
}

module.exports = {
    dashboardGetController,
}