const router = require('express').Router();
let User = require('../models/user.model');
let JobSkill = require('../models/jobSkill.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/").get((req, res) => {
    JobSkill.find()
      .then(jobSkill => res.json(jobSkill))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const jobOpportunityID = req.params.id;
    const skillName= req.body.name;


    const newJobSkill = new JobSkill({
        jobOpportunityID,
        skillName,
    });
    
    newJobSkill
    .save()
    .then(jobSkill => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  

  module.exports = router;