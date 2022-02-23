// dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// import routes && middleware
const allRoutes = require('./routes/routes');
const allMiddleware = require('./middleware/middleware');

// app
const app = express();

// setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// mongodb uri
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twhvb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// using middleware from middleware directory
allMiddleware(app);

// using route from route directory
allRoutes(app);

// common error checker start
app.use((req, res, next) => {
    const error = new Error(`404 page not found.!`);
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
        if (err.status === 404) {
            return res.render('pages/error/404', {
                flashMessages: {}
            })
        }
        res.render('pages/error/500', {
            flashMessages: {}
        })
    })
    // common error checker end

// port listener 
const PORT = process.env.PORT || 4040;

// database connect with mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});
// database connection end
// TODO remove pass: JjpWFVaSHvis33u