const router = require('express').Router();
let User = require('../models/user.model');
let Qualification = require('../models/qualification.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const degreeID= req.body.degreeID;
    const complitionDate= req.body.complitionDate
    const startDate= req.body.startDate;
    const status= req.body.status;


    const newQualification = new Qualification({
        degreeID,
        complitionDate,
        startDate,
        status,
        userId,
    });
    
    newQualification
    .save()
    .then(qualification => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  module.exports = router;