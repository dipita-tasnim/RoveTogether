require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rideRoutes = require('./routes/rides');
const app = require('./app');

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// Routes
app.use('/api/rides', rideRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
});