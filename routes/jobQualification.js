const router = require('express').Router();
let User = require('../models/user.model');
let JobQualification = require('../models/jobQualifications.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/add/:id").post(auth, (req, res) => {
    const jobID = req.params.id;
    const qualificationID = req.body.qualificationID;


    const newJobQualification = new JobQualification({
        jobID,
        qualificationID,
    });
    
    newJobQualification
    .save()
    .then(jobQualification => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  module.exports = router;