// dependencies
const express = require('express');
require('dotenv').config();

// app
const app = express();


// root route
app.get('/', (req, res) => {
    res.json({
        message: 'Root route.!'
    })
})

// port listener 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})