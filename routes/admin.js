const router = require('express').Router();
let User = require('../models/user.model');
let CourseName = require('../models/courseName.model');
let SkillName = require('../models/skillName.model');
let DegreeName = require('../models/degreeName.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let Post = require('../models/post.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route('/users/').get((req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });

  router.route('/user/:id').get((req, res) => {
    User.findById(req.params.id)
      .select('-password')
      .then(user => res.json(user))
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

router.route("/degree").get((req, res) => {
  DegreeName.find()
    .then(degreeNames => res.json(degreeNames))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/job").get((req, res) => {
  JobOpportunity.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/post").get((req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;