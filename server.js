const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require ('body-parser');

const usersRouter = require("./routes/users");
const jobOpportunityRouter = require("./routes/jobOpportunity");
const jobQualificationRouter = require("./routes/jobQualification");
const qualificationRouter = require("./routes/qualification");
const degreeNameRouter = require("./routes/degreeName");
const jobApplicationRouter = require("./routes/jobApplication");

const app = express();
app.use(bodyParser.json())



const MONGODB_URI = require('./config/keys').mongoURI;
mongoose.connect(MONGODB_URI,{ // connect to database
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => { // Check for database connection 
    console.log('Database is connected')
});

app.use("/users", usersRouter) 
app.use("/jobOpportunity", jobOpportunityRouter) 
app.use("/jobQualification", jobQualificationRouter) 
app.use("/qualification", qualificationRouter) 
app.use("/degreeName", degreeNameRouter)
app.use("/jobApplication", jobApplicationRouter)

app.use(morgan("tiny"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV =='production'){
    app.use(express.static('client/build'));
    
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`)); // passwordISnotpasswordyma