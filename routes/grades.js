const router = require('express').Router();
let User = require('../models/user.model');
let Grades = require('../models/grades.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/").get((req, res) => {
    Grades.find()
      .then(grades => res.json(grades))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
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