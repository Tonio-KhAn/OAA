const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = 'mongodb+srv://dcitConnectApp:passwordISnotpasswordyma@dcit-connet-db.btoon.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI,{ // connect to database
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => { // Check for database connection 
    console.log('Database is connected')
});

app.use(morgan("tiny"));

app.get('/api/name',(req, res) => {
    const data = {
        username: 'tonio',
        age: 5 
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`)); // passwordISnotpasswordyma