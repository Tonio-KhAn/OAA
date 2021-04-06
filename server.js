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
const jobSkillRouter = require("./routes/jobSkill");
const skillNameRouter = require("./routes/skillName");
const PostsRouter = require("./routes/Posts")
const courseNameRouter = require("./routes/courseName");
const gradesRouter = require("./routes/grades");
const adminRouter = require("./routes/admin");
const mediaRouter = require("./routes/media");

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

app.use("/users", usersRouter) 
app.use("/jobOpportunity", jobOpportunityRouter) 
app.use("/jobQualification", jobQualificationRouter) 
app.use("/qualification", qualificationRouter) 
app.use("/degreeName", degreeNameRouter)
app.use("/jobApplication", jobApplicationRouter)
app.use("/jobSkill", jobSkillRouter)
app.use("/skillName", skillNameRouter)
app.use("/Posts", PostsRouter)
app.use("/courseName", courseNameRouter)
app.use("/grades", gradesRouter)
app.use("/adminroute", adminRouter)
app.use("/media", mediaRouter)
app.use(express.static('uploads'));
app.use(express.static('resumes'));

app.use(morgan("tiny"));



if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`)); // passwordISnotpasswordyma