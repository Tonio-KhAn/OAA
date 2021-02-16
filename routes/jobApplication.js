const router = require('express').Router();
let User = require('../models/user.model');
let JobApplication = require('../models/jobApplication.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/add/:id").post(auth, (req, res) => {
    const jobOpportunityID = req.params.id;
    const userID = req.user.id;


    const newJobApplication = new JobApplication({
        jobOpportunityID,
        userID,
    });
    
    newJobApplication
    .save()
    .then(jobApplication => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  module.exports = router;