const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require ('body-parser');

const usersRouter = require("./routes/users");

const app = express();
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080;

const MONGODB_URI = require('./config/keys').mongoURI;
mongoose.connect(MONGODB_URI,{ // connect to database
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => { // Check for database connection 
    console.log('Database is connected')
});

app.use("/users", usersRouter) //yy

app.use(morgan("tiny"));

app.get('/api/name',(req, res) => {
    const data = {
        username: 'tonio',
        age: 5 
    };
    res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`)); // passwordISnotpasswordyma