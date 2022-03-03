const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboard');
const postRouter = require('./postRoute');
const rootRoute = require('./rootRoute');
const uploadRoute = require('./uploadsRoute');

const routes = [{
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/uploads',
        handler: uploadRoute
    },
    {
        path: '/posts',
        handler: postRouter
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