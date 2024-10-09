const express = require('express');
const mongoose = require('mongoose');
const { mongoConnect } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./utils/errorHandlers');

const app = express();

// Connect to MongoDB
mongoConnect();

// Middleware to parse JSON bodies
app.use(express.json());

// User and Admin routes
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

// Middleware for handling 404 errors
app.use(notFound);

// Middleware for handling all errors
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
