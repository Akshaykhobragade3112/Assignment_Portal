const mongoose = require('mongoose');

const mongoConnect = () => {
    // Replace <db_password> with the actual password and ensure the database name is specified at the end of the URI
    const dbURI = "mongodb+srv://akshaykhobragade40:Akshay123@cluster0.e5qso.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));
};

module.exports = { mongoConnect };
