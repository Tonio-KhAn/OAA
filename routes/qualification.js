const router = require('express').Router();
let Qualification = require('../models/qualification.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route('/:id').get(auth, (req, res) => {
    const id = req.params.id;
    console.log(id);
    Qualification.find({userId: id})
      .then(qualifications => res.json(qualifications))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const degreeID= req.body.degreeID;
    const startDate= req.body.startDate;
    const status= req.body.status;
    const courses= req.body.courses;

    console.log(courses,status)
    const newQualification = new Qualification({
        degreeID,
        startDate,
        status,
        userId,
        courses,
    });
    
    newQualification
    .save()
    .then(qualification => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  module.exports = router;