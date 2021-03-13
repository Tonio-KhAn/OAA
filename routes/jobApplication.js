const router = require('express').Router();
let User = require('../models/user.model');
let JobApplication = require('../models/jobApplication.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let Qualification = require('../models/qualification.model');
let JobQualifications = require('../models/jobQualifications.model');
let JobSkill = require('../models/jobSkill.model');
let Grades = require('../models/grades.model');
let CourseName = require('../models/courseName.model');

const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/all/:id").get((req, res) => {
    JobApplication.find({jobOpportunityID:req.params.id})
      .then(applications => {
          applications.sort(function(a, b){return b.rank - a.rank});
          res.json(applications)})
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const jobOpportunityID = req.body.jobId;
    const userID = req.user.id;
    var rank = 0;
    var count = 0;
    
    Grades.find()
    .then(grades => {
        console.log(grades);
     Qualification.find({userId: userID})
        .then(degrees => {
          const userDegrees = degrees;
          console.log(userDegrees);

          JobSkill.find({jobOpportunityID:jobOpportunityID})
            .then(jobSkills => {
                console.log("3");

                jobSkills.forEach(jobSkill => {
                console.log(jobSkill);

                CourseName.find({'skills.name': jobSkill.skillName})
                    .then (course => {
                        console.log(course)  
                        userDegrees.forEach(degree => {
                            console.log(degree)  
                        degree.courses.forEach(userCourse => {
                        course.forEach(jobCourse => {
                            console.log(userCourse)
                            console.log(jobCourse.courseTitle)
                            if (jobCourse.courseTitle == userCourse.name) {
                               for (let x=0 ; x<grades.length; x=x+1){
                                   console.log(grades[x].grade)
                                   if (grades[x].grade == userCourse.grade){
                                       rank = rank + grades[x].amount;
                                       x = grades.length;
                                   }
                               }
                            };
                        })
                    })
                    });
                    count++;
                    if (count === jobSkills.length){
                        const newJobApplication = new JobApplication({
                            jobOpportunityID,
                            userID,
                            rank,
                        });

                        newJobApplication
                        .save()
                        .then(application => {return res.status(200).json({msg: 'sucessfull' });})
                        .catch(err => res.status(400).json("Error: " + err));
                    }
                    
                })
                .catch(err => res.status(400).json("Error: " + err));
            })
            console.log(rank);
        })
        .catch(err => res.status(400).json("Error: " + err));
       
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
  }); 

  module.exports = router;
