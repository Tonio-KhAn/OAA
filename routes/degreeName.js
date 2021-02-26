const router = require('express').Router();
let User = require('../models/user.model');
let DegreeName = require('../models/degreeName.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/add").post(auth, (req, res) => {
    const name= req.body.name;

    const newDegreeName = new DegreeName({
        name,
    });
    
    newDegreeName
    .save()
    .then(degreeName => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  

  module.exports = router;