const router = require('express').Router();
let User = require('../models/user.model');
let CourseName = require('../models/courseName.model');
let DegreeName = require('../models/degreeName.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/").get((req, res) => {
    CourseName.find()
      .then(courses => res.json(courses))
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route("/:id/:startDate").get((req, res) => {
    const degreeId = req.params.id;
    const startDate = req.params.startDate;
    var courseArray =[];
    var count = 0;
    var count2 =0;
    CourseName.find()
      .then(courses =>{
    DegreeName.findById(degreeId)
    .then(degree => {
      degree.courses.forEach(course => {
        count2 = 0
        if (course.startYear <= startDate  || course.startYear ==''){
          if(course.endYear == '' || startDate <= course.endYear){
            courses.forEach(courseName => {
            if(courseName._id == course.id)
            {
              courseArray.push(courseName);
            }
            count2= count2 + 1;
            })
          }
        }
        count = count + 1
        if (count == degree.courses.length){
          return res.json(courseArray)
        }
      })
    })
      .catch(err => res.status(400).json("Error: " + err));
  })
  .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const courseCode = req.body.courseCode;
    const courseTitle = req.body.courseTitle;
    const skills = req.body.skills;

    
    const newCourseName = new CourseName({
        courseCode,
        courseTitle,
        skills,
    });
    
    newCourseName
    .save()
    .then(courseName => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  

  module.exports = router;