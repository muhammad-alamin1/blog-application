// dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/authRoute');

// app
const app = express();

// setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware);

// use route
app.use('/auth', authRoutes);



// root route
app.get('/', (req, res) => {
    res.json({
        message: 'Root route.!'
    })
})

// port listener 
const PORT = process.env.PORT || 4040;

// database connect with mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twhvb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
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