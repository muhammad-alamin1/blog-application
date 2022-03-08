// dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejsLint = require('ejs-lint');

// import routes && middleware
const allRoutes = require('./routes/routes');
const allMiddleware = require('./middleware/middleware');
const { pageNotFoundError, commonErrorHandler } = require('./middleware/commonErrorMiddleware');

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

// 404 error
app.use(pageNotFoundError);

// default error
app.use(commonErrorHandler);

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