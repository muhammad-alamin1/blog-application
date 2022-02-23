const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { bindUserWithRequest } = require('./authMiddleware');
const { setLocals } = require('./setLocals');
const morgan = require('morgan');

// mongodb uri
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twhvb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 60 * 60 * 1000 * 2
});


// middleware
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals(),
]

const allMiddleware = app => {
    middleware.forEach(m => {
        app.use(m);
    })
}

module.exports = allMiddleware;