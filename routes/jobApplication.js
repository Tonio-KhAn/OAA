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





router.route("/all/:id").get(auth,(req, res) => {
    var count = 0;
    JobApplication.find({jobOpportunityID:req.params.id})
      .then(applications => {
          applications.sort(function(a, b){return b.rank - a.rank});
          var applied = [];
          User.find()
          .select('-password')
          .then(users => {
            applications.forEach(application => {
                users.forEach( user => {
                if (application.userID == user._id){
                   var temp = {
                    _id: application._id,
                    userID: user._id,
                    uwi_email: user.uwi_email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    sex: user.sex,
                    type: user.type,
                    dob: user.dob,
                    comment: application.comment,
                    media: application.media,
                    counter: count,
                }
                applied.push(temp)
                }
                
               
            })
            count++;
            if (count === applications.length){
                res.json(applied)
            }
            })
          })
          })
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth,(req, res) => {
    console.log(req.body)
    const jobOpportunityID = req.body.jobId;
    const userID = req.user.id;
    var rank = 0;
    var count = 0;
    const media =[];
    const comment = req.body.comment;
    Grades.find()
    .then(grades => {
     Qualification.find({userId: userID})
        .then(degrees => {
          const userDegrees = degrees;
          JobSkill.find({jobOpportunityID:jobOpportunityID})
            .then(jobSkills => {
                jobSkills.forEach(jobSkill => {
                CourseName.find({'skills.name': jobSkill.skillName})
                    .then (course => {
                        userDegrees.forEach(degree => {
                        degree.courses.forEach(userCourse => {
                        course.forEach(jobCourse => {
                            if (jobCourse.courseTitle == userCourse.name) {
                               for (let x=0 ; x<grades.length; x=x+1){
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
                            comment,
                            rank,
                            media,
                        });

                        newJobApplication
                        .save()
                        .then(application => {return res.status(200).json(application._id);})
                        .catch(err => res.status(400).json("Error: " + err));
                    }
                    
                })
                .catch(err => res.status(400).json("Error: " + err));
            })
        })
        .catch(err => res.status(400).json("Error: " + err));
       
        })
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
  }); 

  module.exports = router;
