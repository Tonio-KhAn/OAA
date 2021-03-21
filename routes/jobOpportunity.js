const router = require('express').Router();
let User = require('../models/user.model');
let JobOpportunity = require('../models/jobOpportunity.model');
let JobOpportunityMedia = require('../models/jobOpportunityMedia.model');
let JobQualifications = require('../models/jobQualifications.model');
let JobSkill = require('../models/jobSkill.model');
let Qualification = require('../models/qualification.model');
let JobApplications = require('../models/jobApplication.model');
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

  router.route("/media/:id").get((req, res) => {
    JobOpportunityMedia.find({jobOpportunityID: req.params.id})
      .then(jobOpportunityMedia => res.json(jobOpportunityMedia))
      .catch(err => res.status(400).json("Error: " + err));
  });

  
  router.route("/applyiedJobs/:id").get((req, res) => {
    var jobsList = null;
    var count = 0

    JobApplications.find({userId: req.param.id})
      .then(applications => 
        {
          console.log(applications)
          jobsList = [];
          applications.forEach (application => {
          JobOpportunity.findById(application.jobOpportunityID)
          .then (Opportunity => {
            jobsList.push(Opportunity)
            count = count + 1
            if (count === applications.length){
              res.json(jobsList)
            }
          })
        })
        }
        )
      .catch(err => res.status(400).json("Error: " + err));
  });

router.route("/add").post(auth, (req, res) => {
    const userId = req.user.id;
    const title = req.body.title;
    const company = req.body.company;
    const description = req.body.description;
    const documents = req.body.documents;
    const skills = req.body.skills;
    const degrees = req.body.degrees;
    const newJobOpportunity = new JobOpportunity({
        userId,
        title,
        description,
        company,
    });
    console.log(documents);
    newJobOpportunity
    .save()
    .then(jobOpportunity => { 
      const jobOpportunityID = jobOpportunity.id
      const jobID = jobOpportunity.id
      console.log(jobOpportunity.id)
      documents.forEach(document => {
       const mediaName = document.name
        console.log(document.name)
        const  newJobOpportunityMedia = new JobOpportunityMedia({
        jobOpportunityID,
        mediaName,
       })
       newJobOpportunityMedia
       .save()
    })
    skills.forEach(skill => {
      const skillName = skill.name
       console.log(skill.name)
       const  newJobSkill = new JobSkill({
       jobOpportunityID,
       skillName,
      })
      newJobSkill
      .save()
   })
   console.log(degrees)
   degrees.forEach(degree => {
    const qualificationID = degree.id
    const  newJobQualifications = new JobQualifications({
      jobID,
      qualificationID,
    })
    newJobQualifications
    .save()
 })
    return res.status(200).json({msg: 'sucessfull' });
    })
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
        data.reverse();
        res.json(data);
      }
    })
  });

  router.route("/:id").get(auth, (req, res) => {
    JobOpportunity.find({userId: req.params.id})
    .then(myJobOpportunities => res.json(myJobOpportunities))
    .catch(err => res.status(400).json("Error: " + err));
  });




  module.exports = router;