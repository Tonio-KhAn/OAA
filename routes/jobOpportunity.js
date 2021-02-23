const router = require('express').Router();
let User = require('../models/user.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let JobQualifications = require('../models/jobQualifications.model');
let Qualification = require('../models/qualification.model');
const path = require('path');
const JWT = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'oaafinal831@gmail.com',
      pass:'thisisthepassword',
    },
    tls:{rejectUnauthorized: false
    }
  });

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const title = req.body.title;
    const description = req.body.description;

    const newJobOpportunity = new JobOpportunity({
        userId,
        title,
        description,
    });
    
    newJobOpportunity
    .save()
    .then(jobOpportunity => { return res.status(200).json({msg:"sucessfully added!!!"});})
    .catch(err => res.status(400).json("Error: " + err));

  });

  router.route("/save/:id").get(auth, (req, res) => {
    const jobID = req.params.id;
    JobQualifications.find({jobID: jobID})
    .then(jobQualifications => { 
        jobQualifications.forEach(singleQualification => {
            Qualification.find({degreeID: singleQualification.qualificationID})
            .then(qualification => { 
                qualification.forEach(userQualification => {
                    const thisId = userQualification.userId;
                    User.findById(thisId)
                    .then(user=>{
                        let mailOption = {
                          from: 'oaafinal831@gmail.com',
                         to: user.uwi_email,
                         subject: 'This is a test to see if match works',
                         text: 'this is a test to seee if the matching works ', 
                         html:`
                         <p> Click link to verify email.</p>
                         <h5><a href="http://localhost:8080">link</a></h5>
                         `,
                        }
                        transporter.sendMail(mailOption,function(err, data){
                          if(err){
                           console.log('error',err)
                           return res.status(400).json({msg: 'error' });
                          }else{
                           return res.status(200).json({msg: 'sucessfull' });
                          }
                        });
                      })
                });
            })
          
        });
    })
  
  });
  
  router.route("/").get(auth, (req, res) => {
    JobOpportunity.find((error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json(data);
      }
    })
  });



  module.exports = router;