const router = require('express').Router();
let User = require('../models/user.model');
let CourseName = require('../models/courseName.model');
let SkillName = require('../models/skillName.model');
let DegreeName = require('../models/degreeName.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let Post = require('../models/post.model');
let Grades = require('../models/grades.model');
let Qualification = require('../models/qualification.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route('/users/').get((req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
});

router.route('/qualifications/').get((req, res) => {
  Qualification.find()
    .then(qualificaiton => res.json(qualificaiton))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/user/:id').get((req, res) => {
  User.findById(req.params.id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('msg: ' + err));
  
});

router.route('/skill/:id').get((req, res) => {
  SkillName.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('msg: ' + err));
 
});

router.route('/degree/:id').get((req, res) => {
  DegreeName.findById(req.params.id)
    .then(degree => res.json(degree))
    .catch(err => res.status(400).json('msg: ' + err));
 
});

router.route('/course/:id').get((req, res) => {
  CourseName.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('msg: ' + err));
 
});

router.route('/grade/:id').get((req, res) => {
  Grades.findById(req.params.id)
    .then(grade => res.json(grade))
    .catch(err => res.status(400).json('msg: ' + err));
 
});

router.route('/userUpdate/:id').put((req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  User.findById(req.params.id)
    .then(user => {
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.uwi_email = req.body.uwi_email;
      user.dob = req.body.dob;
      user.sex = req.body.sex;
      user.type = req.body.type;
      
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/skillUpdate/:id').put((req, res) => {
  SkillName.findById(req.params.id)
    .then(skill => {
      skill.name = req.body.name;
      skill
        .save()
        .then(() => res.json(skill))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/degreeUpdate/:id').put((req, res) => {
  DegreeName.findById(req.params.id)
    .then(degree => {
      degree.name = req.body.name;
      degree.courses = req.body.courses;
      degree
        .save()
        .then(() => res.json(degree))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/courseUpdate/:id').put((req, res) => {
  CourseName.findById(req.params.id)
    .then(course => {
      course.courseCode = req.body.courseCode;
      course.courseTitle = req.body.courseTitle;
      course.skills = req.body.courses;
      course
        .save()
        .then(() => res.json(course))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/gradeUpdate/:id').put((req, res) => {
  Grades.findById(req.params.id)
    .then(grade => {
      grade.grade = req.body.grade;
      grade.amount = req.body.amount;
      grade
        .save()
        .then(() => res.json(grade))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/user/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/course/").get((req, res) => {
  CourseName.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/skill").get((req, res) => {
  SkillName.find()
    .then(skillName => res.json(skillName))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/skill/add").post((req, res) => {
  const name= req.body.name;

  const newSkillName = new SkillName({
      name,
  });
  
  newSkillName
  .save()
  .then(skillName=> { return res.status(200).json({msg:"sucessfully added!!!"});})
  .catch(err => res.status(400).json("Error: " + err));

});

router.route("/degree/").get((req, res) => {
  DegreeName.find()
    .then(degreeNames => res.json(degreeNames))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/job/").get((req, res) => {
  JobOpportunity.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/post/").get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/grade/").get((req, res) => {
  Grades.find()
    .then(grades => res.json(grades))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/degree/add").post((req, res) => {
  const name= req.body.name;
  const courses = req.body.courses;

  const newDegreeName = new DegreeName({
      name,
      courses,
  });
  
  newDegreeName
  .save()
  .then(degreeName => { return res.status(200).json({msg:"sucessfully added!!!"});})
  .catch(err => res.status(400).json("Error: " + err));

});

router.route("/course/add").post((req, res) => {
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

router.route("/grade/add").post((req, res) => {
  const grade = req.body.grade;
  const amount = req.body.amount;
  

  const newGrade = new Grades({
      grade, 
      amount,
  });
  
  newGrade
  .save()
  .then(gradeName => { return res.status(200).json({msg:"sucessfully added!!!"});})
  .catch(err => res.status(400).json("Error: " + err));

});

module.exports = router;