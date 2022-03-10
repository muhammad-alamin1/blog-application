const apiRouter = require('../api/routes/apiRoute');
const authorRouter = require('./authorRoute');
const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboard');
const explorerRouter = require('./explorerRoute');
const postRouter = require('./postRoute');
const rootRoute = require('./rootRoute');
const searchRouter = require('./searchRoute');
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
        path: '/api',
        handler: apiRouter
    },
    {
        path: '/explorer',
        handler: explorerRouter
    },
    {
        path: '/search',
        handler: searchRouter
    },
    {
        path: '/author',
        handler: authorRouter
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