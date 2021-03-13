const router = require('express').Router();
let User = require('../models/user.model');
let CourseName = require('../models/courseName.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/").get((req, res) => {
    CourseName.find()
      .then(courses => res.json(courses))
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