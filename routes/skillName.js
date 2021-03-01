const router = require('express').Router();
let User = require('../models/user.model');
let SkillName = require('../models/skillName.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.route("/").get((req, res) => {
    SkillName.find()
      .then(skillName => res.json(skillName))
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const name= req.body.name;

    const newSkillName = new SkillName({
        name,
    });
    
    newSkillName
    .save()
    .then(skillName=> { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  

  module.exports = router;