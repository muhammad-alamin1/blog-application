const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboard');
const rootRoute = require('./rootRoute');

const routes = [{
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/',
        handler: rootRoute
    },
];

const allRoutes = app => {
    routes.forEach(route => {
        app.use(route.path, route.handler);
    })
}

module.exports = allRoutes;