// dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

// import routes
const rootRoute = require('./routes/rootRoute');
const authRoutes = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboard');

// import middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware');
const { setLocals } = require('./middleware/setLocals');

// app
const app = express();

// setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// store session
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
    bindUserWithRequest(),
    setLocals()
]
app.use(middleware);

// use route
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRouter)
app.use('/', rootRoute);


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